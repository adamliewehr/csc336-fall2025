import { useState } from 'react'

import GridRow from './gridRow';
import { useEffect } from 'react';

function TicTacToe_GameBoard() {

    const [dimension, setDimension] = useState(3);
    const [turn, setTurn] = useState(1);


    // const [childData, setChildData] = useState(null);
    // function handleChildData(data) {
    //     setChildData(data);
    // };

    // useEffect(()=>{

    //     // need to print out the game board in data format

    //     let board = []


        


    // }, [turn])// when the turn changes, run the function


    let rows = []

    for (let i = 0; i < dimension; i++) {
        rows.push([]);
    }

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            rows[i].push(
                ""
            )

        }

    }

    function swapPlayer() {
        setTurn(turn*-1);
    }

    return (

        <div>
            <h1>Tic Tac Toe</h1>

            <input
                type="text"
                name="tttRowNumber"
                id="tttRowNumber"
                placeholder="Dimension"
                onChange={e => setDimension(e.target.value)} />


            <h1>It's player {turn==1 ? 1 : 2} turn</h1>
            {/* need to pass in turn and change it whenver the player(s) click the screen */}
            
            {

                rows.map((row, index) => {
                    
                    return <GridRow
                    key={index*-1}
                    rowContents={row}
                    rowIndex = {index}
                    lastRow = { index==rows.length-1 ? true : false }
                    turn = {turn}
                    changePlayer = {swapPlayer}
                    // rowData = {handleChildData}
                    
                    ></GridRow>

                })

            }

        
            


        </div>

    )
}

export default TicTacToe_GameBoard

