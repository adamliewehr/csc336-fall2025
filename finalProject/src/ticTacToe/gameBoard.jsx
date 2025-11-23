import { useState, useEffect } from 'react'
import GridRow from './gridRow';

function TicTacToe_GameBoard() {

    const [dimension, setDimension] = useState(null);
    // fill the array with something so the gameBoard can be initilized correctly
    const [gameBoard, setGameBaord] = useState(Array(dimension).fill(Array(dimension).fill("")));
    const [turn, setTurn] = useState(1);
    const [newData, setNewData] = useState({ boxContents: "", cords: [0, 0] });

    // leared something:

    // Incorrect way to create a matrix
    // const initialMatrix = Array(3).fill(Array(3).fill(0));

    //In this scenario, all three inner arrays are actually references to the exact same array in memory. 
    // When you change a value in the "first row" (initialMatrix[0][0] = 1), you are changing the shared array, 
    // so the change appears in all "rows" (which are all the same underlying object). 

    // so we need to create the array this way:

    // Array.from({ length: dimension }, () => Array(dimension).fill(""))


    useEffect(() => {

        //create a copy of gameBoard
        let gameBoardCopy = [...gameBoard];

        gameBoardCopy[newData.cords[0]][newData.cords[1]] = newData.boxContents;

        // console.log(gameBoardCopy);

        setGameBaord(gameBoardCopy);

        

        // console.log(gameBoard)


    }, [newData])

    useEffect(() => {
        clearBoard()

    }, [dimension])

    function clearBoard() {
        // initilize the array properly
        let array = Array.from({ length: dimension }, () => Array(dimension).fill(""));
        setGameBaord(array)
        console.log("Cleared")
    }

    function changePlayer() {
        setTurn(turn * -1);
    }

    function getBoxData(data) {
        setNewData(data)
    }

    return (

        <div>
            <h1>Tic Tac Toe</h1>

            <h2>Enter the size of the game board desired!</h2>

            <input
                type="text"
                name="dimensionInput"
                id="dimensionInput"
                placeholder="Dimension"
                onChange={e => setDimension(isNaN(parseInt(e.target.value, 10)) ? 1 : parseInt(e.target.value, 10))} />
            {/* the fact that isNaN(typeof parseInt(input, 10)) ? 1 : parseInt(input, 10) doesn't work is actually insane. JavaScript is an interesting language*/}

            <input type="button"
                value="Clear Board"
                name="clearBoard"
                id="clearBoard"
                onClick={clearBoard} />



            <h1>
                {!dimension ? "" : `It's player ${turn == 1 ? 1 : 2} turn`}
            </h1>
            {/* need to pass in turn and change it whenver the player(s) click the screen */}

            {

                gameBoard.map((row, index) => {

                    return <GridRow
                        key={index * -1}
                        rowContents={row}
                        rowIndex={index}
                        dimension={gameBoard.length}
                        turn={turn}
                        changePlayer={changePlayer}
                        getBoxData={getBoxData}



                    ></GridRow>

                })

            }



        </div>

    )
}

export default TicTacToe_GameBoard

