import { useState } from 'react'
import GridBox from './gridBox'
import { useEffect } from 'react';

function GridRow({ rowContents, rowIndex, lastRow, turn, changePlayer }) { // will take in a list of GridNumbers

    const [gameBoardData, setGameBoardData] = useState(Array(lastRow).fill(Array(lastRow).fill([0]).flat()));
    
    
    const [childData, setChildData] = useState(null);
    

    function handleChildData(data) {
        setChildData(data);
    };

    useEffect(() => {
        console.log(childData)
        console.log(gameBoardData) // TODO: THIS IS BROKEN
        


    }, [childData])


    return (

        <div className="flex-container">


            {rowContents.map((item, index) => {

                return <GridBox
                    key={index}
                    rowIndex={rowIndex}
                    colIndex={index}
                    lastRow={lastRow}
                    lastCol={index == rowContents.length - 1 ? true : false}
                    turn={turn}
                    changePlayer={changePlayer}
                    childData = {handleChildData}
                >

                </GridBox>


            })}

        </div>

    )
}

export default GridRow

