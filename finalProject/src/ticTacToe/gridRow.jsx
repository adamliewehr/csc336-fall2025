import { useState } from 'react'
import GridNumber from './gridNumber'

function GridRow({rowContents, rowIndex, lastRow}) { // will take in a list of GridNumbers


    return (

        <div className="flex-container">
            

            {rowContents.map((item, index) =>{

                return <GridNumber
                key = {index}
                rowIndex = {rowIndex}
                colIndex = {index}
                lastRow = {lastRow}
                lastCol = {index==rowContents.length-1 ? true : false}
                >
                
                </GridNumber>


            })}
            
        </div>

    )
}

export default GridRow

