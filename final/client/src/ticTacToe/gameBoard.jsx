import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import GridRow from './gridRow';

function TicTacToe_GameBoard() {
    const currentUsername = localStorage.getItem('username'); // current user
    // fill the array with something so the gameBoard can be initilized correctly
    const [gameBoard, setGameBaord] = useState([]);
    const [newData, setNewData] = useState({ cords: [0, 0] }); // I'm scared to remove this even though it does nothing
    const { gameId } = useParams();
    const [gameData, setGameData] = useState({})

    const navigate = useNavigate();

    async function getGameData() {

        // authenticating the user

        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('User not logged in. ');
            alert("user not logged in")
            navigate("/")
            return {}
        }

        try {

            const response = await fetch(`/api/getGameInfo/${gameId}`, {
                method: 'GET',
                headers: {
                    // Attach the token to the Authorization header
                    'Authorization': `Bearer ${token}` //  THE authMiddleware IS WHAT REQUIRES THIS
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch game data. Status: ${response.status}`);
            }

            const data = await response.json();

            setGameBaord(data.gameBoard);

            return data;

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("updating");

            getGameData().then(data => {
                setGameData(data);
                if (data.gameEnded) {

                    alert("game has ended! if you're seeing this, you lost :( You are being navigated to the games list page to try again!");
                    navigate("/games")
                }
            });
        }, 2000);


        getGameData().then(data => {
            if (data) {

                setGameData(data)

            }
            else {
                console.log("something went wrong")
            }

        }).catch(error => {
            console.log(error)
        })

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    }, [gameBoard]);

    // leared something:

    // Incorrect way to create a matrix
    // const initialMatrix = Array(3).fill(Array(3).fill(0));

    // In this scenario, all three inner arrays are actually references to the exact same array in memory. 
    // When you change a value in the "first row" (initialMatrix[0][0] = 1), you are changing the shared array, 
    // so the change appears in all "rows" (which are all the same underlying object). 

    // so we need to create the array this way:

    // Array.from({ length: dimension }, () => Array(dimension).fill(""))

    async function makeMove(move) {

        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('User not logged in. ');
            alert("user not logged in")
            navigate("/")
            return {}
        }

        try {

            const response = await fetch(`/api/games/${gameId}/move`, {
                method: 'POST',
                headers: {

                    // Attach the token to the Authorization header
                    'Authorization': `Bearer ${token}`, //  THE authMiddleware IS WHAT REQUIRES THIS
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(move),
            });

            const data = await response.json();

            if (data.numOfMoves == (data.gameSpecifications.tttDimension) * (data.gameSpecifications.tttDimension)) {

                endGame("-") // if tie

            }

            checkWin(data.gameBoard);

            return data;

        } catch (e) {
            console.log(e)
        }

    }

    async function endGame(winner) {

        let toSend = {
            winnerXorO: winner
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('User not logged in. ');
            alert("user not logged in")
            navigate("/")
            return {}
        }

        try {

            const response = await fetch(`/api/games/${gameId}/endGame`, {
                method: 'POST',
                headers: {

                    // Attach the token to the Authorization header
                    'Authorization': `Bearer ${token}`, //  THE authMiddleware IS WHAT REQUIRES THIS
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toSend),
            });

            if (winner == "-") {

                alert(`The game ended in a tie! Navigating you back to the games list...`)
                navigate('/games');

            } else {

                alert(`Game has ended! ${winner} wins! Navigating you back to the games list...`)
                navigate('/games');

            }

            const data = await response.json();

            return data;

        } catch (e) {
            console.log(e)
        }

    }

    async function checkWin(gameBoard) {

        // rows

        for (const row of gameBoard) {

            let currentRow = [...new Set(row)]
            if (currentRow.length == 1 && currentRow[0] != "") {

                endGame(currentRow[0])

            }

        }

        // transposed array

        const transposedArray = gameBoard[0].map((_, colIndex) =>
            gameBoard.map(row => row[colIndex])
        );

        // cols

        for (const row of transposedArray) {

            let currentRow = [...new Set(row)]
            if (currentRow.length == 1 && currentRow[0] != "") {

                endGame(currentRow[0])

            }

        }

        // diags (can only win on the middle 'X' diags)

        let leftToRightDiag = []
        let rightToLeftDiag = []

        for (let i = 0; i < gameBoard.length; i++) {

            leftToRightDiag.push(gameBoard[i][i])
            rightToLeftDiag.push(gameBoard[i][gameBoard.length - i - 1])

        }

        let setLeftToRightDiag = [...new Set(leftToRightDiag)]
        let setRightToLeftDiag = [...new Set(rightToLeftDiag)]

        if (setLeftToRightDiag.length == 1 && setLeftToRightDiag[0] != "") {

            endGame(currentRow[0])

        }

        if (setRightToLeftDiag.length == 1 && setRightToLeftDiag[0] != "") {

            endGame(currentRow[0])

        }


    }


    function getBoxData(data) {

        if (!gameData.gameEnded) {

            if (gameData.createdBy && gameData.players.length == 2) {

                if (gameData.gameBoard[data.cords[0]][data.cords[1]] == "") {

                    if (gameData.numOfMoves % 2 == 0 && gameData.players[0] == currentUsername) { // player 1's turn

                        let toSend = {
                            boxContents: "X",
                            cords: [data.cords[0], data.cords[1]]
                        }

                        makeMove(toSend);

                        console.log('player 1 took their turn');

                    } else if (gameData.numOfMoves % 2 == 1 && gameData.players[1] == currentUsername) { // player 2's turn

                        let toSend = {
                            boxContents: "O",
                            cords: [data.cords[0], data.cords[1]]
                        }

                        makeMove(toSend);

                        console.log('player 2 took their turn');

                    }

                }

            }
        }

        else {
            alert(`Game has ended! If you're seeing this message, you lost :(`)
        }
    }

    return (

        <div>

            <h1>Game ID: {gameId}</h1>
            <h1>Game Name: {gameData.createdBy ? gameData.name : "Loading..."}</h1>
            <h1>Dimension: {gameData.createdBy ? gameData.gameSpecifications.tttDimension : "Loading..."}</h1>
            <h1>It's player {gameData.createdBy && gameData.numOfMoves % 2 == 0 ? "1s" : "2"} turn</h1>
            <h1>Player 1: {gameData.createdBy ? gameData.createdBy : "Loading..."}</h1>
            <h1>Player 2: {gameData.createdBy && gameData.players.length == 2 ? gameData.players[1] : "Waiting for player to join..."} </h1>

            {
                gameBoard.map((row, index) => {

                    return <GridRow
                        key={index * -1}
                        rowContents={row}
                        rowIndex={index}
                        dimension={gameBoard.length}
                        getBoxData={getBoxData}
                    ></GridRow>

                })

            }

        </div>

    )
}

export default TicTacToe_GameBoard