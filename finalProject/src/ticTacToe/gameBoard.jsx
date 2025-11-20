import { useState } from 'react'

import GridRow from './gridRow';
import { useEffect } from 'react';

function TicTacToe_GameBoard() {

    const [dimension, setDimension] = useState(null);
    const [turn, setTurn] = useState(1);

    const [boardData, setBoardData] = useState(Array(dimension).fill([])); 
    const [rowData, setRowData] = useState(null);

    function getRowData(data) {
        setRowData(data);
    };

    useEffect(() => {

        try {

            // console.log(`from gameboard: ${boardData.row}`);

            setBoardData(
                boardData.map((row, i) => {
                    console.log(row)
                    if (rowData==null) {
                        return []
                    }
                    if (i == rowData.index) {
                        return rowData.rowData;
                    }
                    return row;

                })
            );

            // console.log(boardData)

        }
        catch {
            console.log('dumb react error')
        }

    }, [rowData])



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
        setTurn(turn * -1);
    }

    return (

        <div>
            <h1>Tic Tac Toe</h1>

            <h2>Enter the size of the game board desired!</h2>

            <input
                type="text"
                name="tttRowNumber"
                id="tttRowNumber"
                placeholder="Dimension"
                onChange={e => setDimension(e.target.value)} />


            <h1>
                {!dimension ? "" : `It's player ${turn == 1 ? 1 : 2} turn`}
            </h1>
            {/* need to pass in turn and change it whenver the player(s) click the screen */}

            {

                rows.map((row, index) => {

                    return <GridRow
                        key={index * -1}
                        rowContents={row}
                        rowIndex={index}
                        lastRow={index == rows.length - 1 ? true : false}
                        turn={turn}
                        changePlayer={swapPlayer}
                        dimension={rows.length}
                        rowData={getRowData}

                    // rowData = {handleChildData}

                    ></GridRow>

                })

            }





        </div>

    )
}

export default TicTacToe_GameBoard

