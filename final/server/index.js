import 'dotenv/config'; // Loads the .env file

import express from 'express';
import mongoose from 'mongoose'; // mongoDB connection
import bcrypt from 'bcrypt'; // for hasing passwords
import jwt from 'jsonwebtoken'; // to create a secure id for users? i think?
import cors from 'cors';

import User from './models/User.js'; // user model for MongoDB
import Game from './models/Game.js';


import authMiddleware from './middleware/authMiddleware.js';



const app = express();
app.use(express.json())
app.use(cors()); // Allows requests from your client's origin
const PORT = 3000;
app.use(express.static('public')); // this was the key!!

// connection to MongoDB with then catch
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to mongoDB");

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

}).catch((error) => {
    console.error('mongoDB connection error:', error);
    // Stop the Node.js process if the connection fails
    process.exit(1);
});


app.post('/api/auth/register', async (req, res) => { // needs to be async since we are connecting to a db
    const { username, password } = req.body; // this is what we get from the form

    const existingUser = await User.findOne({ username }); // finds a username to check if its unique in the MongoDB data base

    if (existingUser) {
        // 409 Conflict status code means the resource already exists
        return res.status(409).send({ message: 'Username already taken.' });
    }

    // the username is unique
    // hash the password
    const saltRounds = 10; // The cost factor for hashing—10 is standard
    // this is the strength of the hashing I think
    const hashedPassword = await bcrypt.hash(password, saltRounds); // line that hashes the password

    // Create and save the new User document to MongoDB
    // We use the imported 'User' model here that we imported earlier
    const newUser = await User.create({
        username,
        password: hashedPassword, // Store the hashed password
    });

    // Success response (201 Created)
    res.status(201).send({ message: 'Account created successfully!', userId: newUser._id });

});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body; // Object Destructuring
    // this is what is sent from the form on the login page

    // Find the user by username
    const user = await User.findOne({ username });

    // Check for user existence
    if (user == null) {

        return res.status(401).send({ message: 'Invalid credentials' });
        // wanted to use User does not exist
        // but was told to use Invalid credentials for security reasons, makes sense
    }


    // Compare passwords 
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        // If the passwords don't match, send the same generic error
        return res.status(401).send({ message: 'Invalid credentials.' });
    }

    // now we create a JSON web token
    // we install jsonwebtoken using "npm install jsonwebtoken"
    // to make this secure, we use a mongoDB perpenement ID (_id)

    // Create the JWT
    const token = jwt.sign(
        { userId: user._id }, // encoding the unique ID
        process.env.JWT_SECRET, // The key in .env 
        { expiresIn: '1h' }     // Token expires after 1 hour
    );

    // Success response (200 OK)
    res.status(200).send({
        token: token,
        username: user.username // Send the username back
    });
});

app.get("/api/users/me", authMiddleware, async (req, res) => {

    const user = await User.findById(req.userId).select('-password'); // exclude password from query

    res.send({ userInfo: user }); // Sends string

});


app.post("/api/postGame", authMiddleware, async (req, res) => {
    // res.send({test: "test"})
    const { username, gameName, gameSpecifications, gameState, gameBoard, players, numOfMoves, gameEnded } = req.body;

    // console.log(username);
    // console.log(gameName);
    // console.log(gameSpecifications);

    const newGame = await Game.create({
        createdBy: username,
        name: gameName,
        gameSpecifications: gameSpecifications,
        gameState: gameState,
        gameBoard: gameBoard,
        players: players,
        numOfMoves: numOfMoves,
        gameEnded: gameEnded
    });

    res.send(newGame)

});

app.get("/api/getGames", authMiddleware, async (req, res) => {

    const listOfgames = await Game.find({ $or: [{ gameState: "pending" }, { gameState: "active" },] });
    res.send(listOfgames);


    // res.send({test: "test"});


});

app.patch("/api/games/:id/join", authMiddleware, async (req, res) => {

    const joinInfo = req.body;
    const gameId = req.params.id; // The ID of the game being joined



    const game = await Game.findOne({ _id: gameId });

    if (game == null) {
        return res.status(404).send("game not found");
    }

    if (game.gameState != "pending") {
        return res.send("game full")


    }


    if (game.players.length == 2) {
        return res.send("game full")
    } else {
        game.gameState = "active";
        game.players.push(joinInfo.playerJoining);
    }

    game.save()
        .then(doc => { // what does doc mean? it means document
            console.log('game saved:', doc);
        })
        .catch(err => {
            console.error(err);
        });

    res.send(game)

})

app.get("/api/getGameInfo/:id", authMiddleware, async (req, res) => {

    const gameId = req.params.id; // The ID of the game being accessed

    const gameInfo = await Game.findOne({ _id: gameId });
    // .find() returns an array, even if there's only one object
    // .findOne returns an object

    res.send(gameInfo);

});

app.post("/api/games/:gameId/move", authMiddleware, async (req, res) => {

    const gameId = req.params.gameId; // The ID of the game being changed

    const { boxContents, cords } = req.body;

    console.log(boxContents)
    console.log(cords)

    const game = await Game.findOne({ _id: gameId });

    // console.log(game)

    game.numOfMoves++;

    //create a copy of gameBoard
    let gameBoardCopy = [...game.gameBoard];

    gameBoardCopy[cords[0]][cords[1]] = boxContents;


    game.gameBoard = gameBoardCopy;
    game.markModified('gameBoard'); // this was the key!?

    game.save()
        .then(doc => { // what does doc mean? it means document
            console.log('move made:', doc);
        })
        .catch(err => {
            console.error(err);
        });

    res.send(game)

})

app.post("/api/games/:gameId/endGame", authMiddleware, async (req, res) => {

    const gameId = req.params.gameId; // The ID of the game being checked

    // need to mark game as complete
    // update player status 
    // if they won, add a win
    // either way, add a game played

    const { winnerXorO } = req.body;

    // console.log(`the winner is: ${winnerXorO}`);

    const game = await Game.findOne({ _id: gameId });
    game.gameEnded = true;

    game.gameState = "complete"

    const player1 = await User.findOne({ username: game.players[0] })
    const player2 = await User.findOne({ username: game.players[1] })

    player1.gamesPlayed++;
    player2.gamesPlayed++;

    if (winnerXorO == "X") { // game.players[0] wins


        player1.wins++;



    }
    else if (winnerXorO == "O") { // game.players[1] wins


        player2.wins++;



    } // there is no else since ties can happen

    player1.save()
        .then(doc => {
            console.log('player1 has been saved', doc);
        })
        .catch(err => {
            console.error(err);
        });

    player2.save()
        .then(doc => {
            console.log('player1 has been saved', doc);
        })
        .catch(err => {
            console.error(err);
        });


    game.save()
        .then(doc => { // what does doc mean? it means document
            console.log('game has ended:', doc);
        })
        .catch(err => {
            console.error(err);
        });

    res.send(game)

})