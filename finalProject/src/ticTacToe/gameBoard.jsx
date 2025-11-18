import { useState } from 'react'

import GridRow from './gridRow';

function TicTacToe_GameBoard() {

    const [dimension, setDimension] = useState(3);


    let rows = []

    for (let i = 0; i < dimension; i++) {
        rows.push([]);
    }

    // if square is in the top row, make the top of the border none,
    // if the square is in the bottom row, make the bottom of the border none
    // if the square is on the side, make the left/right border none
    // anywhere else, the border should be on all sides

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            rows[i].push(
                ""
            )

        }

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
            


            {

                rows.map((row, index) => {
                    
                    return <GridRow
                    key={index*-1}
                    rowContents={row}
                    rowIndex = {index}
                    lastRow = { index==rows.length-1 ? true : false }
                    ></GridRow>

                } )

            }

        
            


        </div>

    )
}

export default TicTacToe_GameBoard

