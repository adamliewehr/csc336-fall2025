# Game Website

[Link to website](https://csc336-fall2025-efwe.onrender.com)

Raw link: https://csc336-fall2025-efwe.onrender.com

## What my web app does:

My website lets users create accounts, and play games with other users. Right now, the only game is Tic Tac Toe, but I might add other games later. I was hoping to add another games, but setting everything up, especially the authentication part, proved to be a challange, so I just stuck with Tic Tac Toe. 

## How it actually works: 

My website uses Mongo DB to store pretty much all the data about the users, and the games they play. 

### The User DB Schema:

username (String), password (String), wins (Number), losses (Number), gamesPlayed (Number). 

When the user registeres on the "Register" page, the Mongo DB document for that user gets created. This data is used in several ways. 

1. The user can view their "stats" on the Profile page. This displays their username, number of games played, and wins.
2. The username is used for joining games, and is stored in the game schema which I will explain next. 

### The Game DB Schema:

createdBy (String), name (String), gameSpecifications (Object), gameState (String), gameBoard (Array), players (Array), numOfMoves (Number), gameEnded (Boolean).

A user can choose to create a game on the Game List page. The page prompts the user to post a game, and the user can choose a game (right now just tic tac toe), and if the user chooses tic tac toe, a dimension input box shows up. This is where the user can definet he dimension of thier board. Traditionally, tic tac toe is played on a 3x3, but there are no limits here. I haven't tried 1000x1000 yet, and I don't want to for the sake of not breaking my website. If you would like to, be my guest! 

## How to post/join a game

When the user clicks submit, a game document is created in MongoDB, it stores who created it, what game, game specifications, and assigns a gameState of pending to the game, along with adding the gameboard and players to an array. There are more variables, which I'll mention later. 

Once a user posts a game, the user is navigated to that games game page, where they wait for another player to join. 

To join a game, another player must go to the game list page, and view the list of pending or active games. The list of games is created by querying the Mongo DB Game collection for any games that are pending or active. 

Games that are pending are outlined in green, and games that are active are outlined in red. Active games are a full game, and another player cannot join. If a player clicks on a pending game, they are navigated to that games game page, and can play tic tac toe with the other player. 
        
Each game page is updated every 2 seconds, as to simulate real time playing. Every time a player clicks a square, their move is sent to Mongo DB, and the gameboard stored in the DB is updated, an sent back to the front end to re-render the board. Every time a player makes a move, the app checks if a player has won, and ends the game accordingly. 

## Authentication

If you look through the codebase, you will see that every time a fetch is called, we must authenticate the user. The user's authentication expires after 1 hour, and they most log in again. 

For the authentication I used bycrypt and jsonwebtoken. I didn't know anything about these libraries before doing this, and I barely know anything about them now. I just used them to create "middleware" (which is think is just the authentication process, still not clear on that), and carried on with the project. 

The user's password is not directly stored in the DB, it is hashed and then stored. To check if a user's password is correct during the login process, we check a hashed version of the entered password aginst the DB version. 

## Additional Notes

This website is full of bugs, and needs more testing, and sometimes doesn't even work but I had so much fun making it. I learned so much doing this, from creating a REST API, to Mongo DB, it was so worth the struggle. 

React was also extremly rewarding. Creating the dynamic tic tac toe board was actually super cool, and playing around with it was fun.

I thought that once I had the front end down, the rest would be a breeze, but the backend was actually the most time consuming part. Creating the end points was confusing at times, especially sicne Mongo DB was baked into it, but I got the hang of it by the end. 

Overall, this was the most rewarding project I've ever made and class I've ever taken. Thank you Professor Treanor! 



## Things I learned about web development:

1. Be careful about light mode and dark mode! 
2. Be careful about how to initilize arrays in react/js
3. Javascript is weird