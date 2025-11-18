import { useState } from 'react'
import GridRow from './gridRow'
import gameBoard from "./gameBoard.json"

function LineOfN_GameBoard() { // will take in a list of GridNumbers

    const [board, setBoard] = useState(gameBoard);


    return (

        <div>

            {board.map((row, index) => {

                let currentRow = []

                for (let item of row) {
                    // console.log(item.number);
                    currentRow.push(item);
                }

                // {console.log(currentRow)}

                return <GridRow
                    key={index * -1}
                    rowContents={currentRow}
                ></GridRow>

                // item.map((innerItem, index) => {
                //   // console.log(innerItem.number);

                // })

            })}



        </div>

    )
}

export default LineOfN_GameBoard

