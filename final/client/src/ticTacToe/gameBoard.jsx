import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'



import GridRow from './gridRow';

function TicTacToe_GameBoard() {
    const currentUsername = localStorage.getItem('username');// current user
    // const [dimension, setDimension] = useState(null);
    // fill the array with something so the gameBoard can be initilized correctly
    const [gameBoard, setGameBaord] = useState([]);
    // const [turn, setTurn] = useState(1);
    const [newData, setNewData] = useState({ cords: [0, 0] });

    const { gameId } = useParams();
    const [gameData, setGameData] = useState({})
    // const [count, setCount] = useState(0);
    // const [gameEnded, setGameEnded] = useState(false)
    const navigate = useNavigate();

    async function getGameData() {

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

            // console.log(data);

            setGameBaord(data.gameBoard);



            return data;

        } catch (e) {
            console.log(e)
        }

    }

    // function test() {
    //     setCount(count + 1);
    // }

    // useEffect(() => {


    //     // let array = Array.from({ length: dimension }, () => Array(dimension).fill(""));
    //     // setGameBaord(array)


    //     // console.log(gameData);

    // }, [])

    // useEffect(() => {

    //     try {

    //         setDimension(gameData.gameSpecifications.tttDimension)
    //         console.log(dimension)

    //     } catch (e) {
    //         console.log(e)
    //     }


    // }, [gameData])





    useEffect(() => {
        const interval = setInterval(() => {
            console.log("updating");





            getGameData().then(data => {
                // console.log("Got fresh data:", data);
                setGameData(data);
                if (data.gameEnded) {

                    alert("game has ended! if you're seeing this, you lost :( You are being navigated to the games list page to try again!");
                    navigate("/games")
                }
            });
        }, 2000);

        // if (gameData.createdBy) {
        //     checkWin(gameBoard)
        // }








        getGameData().then(data => {
            // console.log("Raw data from API:", data);]
            if (data) {
                // console.log("Setting gameData to:", data);
                setGameData(data)

                // console.log(dimension)


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
        // console.log("GameData updated:", gameData);
    }, [gameBoard]);


    // leared something:

    // Incorrect way to create a matrix
    // const initialMatrix = Array(3).fill(Array(3).fill(0));

    //In this scenario, all three inner arrays are actually references to the exact same array in memory. 
    // When you change a value in the "first row" (initialMatrix[0][0] = 1), you are changing the shared array, 
    // so the change appears in all "rows" (which are all the same underlying object). 

    // so we need to create the array this way:

    // Array.from({ length: dimension }, () => Array(dimension).fill(""))


    // useEffect(() => { // this is when a player takes a turn

    //     // //create a copy of gameBoard
    //     // let gameBoardCopy = [...gameBoard];

    //     // gameBoardCopy[newData.cords[0]][newData.cords[1]] = newData.boxContents;

    //     // // console.log(gameBoardCopy);
    //     // setGameBaord(gameBoardCopy);

    //     // this is the check that needs to happen to ensure both players are in the game
    //     // gameData.createdBy && gameData.players.length==2



    //     // console.log(gameBoard)

    // }, [newData])

    async function makeMove(move) {
        // e.preventDefault();

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

            // console.log(data.gameBoard)

            if (data.numOfMoves == (data.gameSpecifications.tttDimension)*(data.gameSpecifications.tttDimension)) {

                endGame("-")

            }

            


            checkWin(data.gameBoard);

            return data;

        } catch (e) {
            console.log(e)
        }

    }



    // useEffect(() => {
    //     clearBoard()

    // }, [dimension])

    // function clearBoard() {
    //     // initilize the array properly
    //     let array = Array.from({ length: dimension }, () => Array(dimension).fill(""));
    //     setGameBaord(array)
    //     console.log("Cleared")
    // }

    // function changePlayer() {
    //     setTurn(turn * -1);
    // }

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
                // window.location.reload(false);

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
                // setGameEnded(true)
                endGame(currentRow[0])



                // console.log(`${currentRow[0]} wins!`)

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

                // setGameEnded(true)
                endGame(currentRow[0])
                // console.log(`${currentRow[0]} wins!`)

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
            // setGameEnded(true)

            endGame(currentRow[0])
            // console.log(`${setLeftToRightDiag[0]} wins!`)

        }

        if (setRightToLeftDiag.length == 1 && setRightToLeftDiag[0] != "") {

            // setGameEnded(true)
            endGame(currentRow[0])
            // console.log(`${setRightToLeftDiag[0]} wins!`)

        }


    }


    function getBoxData(data) {

        if (!gameData.gameEnded) {


            if (gameData.createdBy && gameData.players.length == 2) {
                // console.log('setting box data')
                // setNewData(data);

                // console.log(gameBoard)


                if (gameData.gameBoard[data.cords[0]][data.cords[1]] == "") {


                    // console.log("in!")



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
            {/* <h1>Tic Tac Toe</h1> */}

            <h1>Game ID: {gameId}</h1>
            <h1>Game Name: {gameData.createdBy ? gameData.name : "Loading..."}</h1>
            <h1>Dimension: {gameData.createdBy ? gameData.gameSpecifications.tttDimension : "Loading..."}</h1>
            <h1>It's player {gameData.createdBy && gameData.numOfMoves % 2 == 0 ? "1s" : "2"} turn</h1>
            <h1>Player 1: {gameData.createdBy ? gameData.createdBy : "Loading..."}</h1>
            <h1>Player 2: {gameData.createdBy && gameData.players.length == 2 ? gameData.players[1] : "Waiting for player to join..."} </h1>


            {/* <input value="getData" type="button" onClick={test}/> */}

            {/* <h2>Enter the size of the game board desired!</h2> */}

            {/* <input
                type="text"
                name="dimensionInput"
                id="dimensionInput"
                placeholder="Dimension"
                onChange={e => setDimension(isNaN(parseInt(e.target.value, 10)) ? 1 : parseInt(e.target.value, 10))} /> */}
            {/* the fact that isNaN(typeof parseInt(input, 10)) ? 1 : parseInt(input, 10) doesn't work is actually insane. JavaScript is an interesting language*/}

            {/* <input type="button"
                value="Clear Board"
                name="clearBoard"
                id="clearBoard"
                onClick={clearBoard} /> */}



            {/* <h1>
                {!dimension ? "" : `It's player ${turn == 1 ? 1 : 2} turn`}
            </h1> */}
            {/* need to pass in turn and change it whenver the player(s) click the screen */}

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

