import { useState, useEffect, useRef } from 'react'
import GridBox from './gridBox'


function GridRow({ rowContents, rowIndex, dimension, getBoxData }) { // will take in a list of GridBoxes

    return (

        <div className="flex-container">


            {rowContents.map((item, index) => {

                return <GridBox
                    key={index}
                    boxContents={item}
                    rowIndex={rowIndex}
                    colIndex={index}
                    dimension={dimension}
                    getBoxData={getBoxData}

                >

                </GridBox>


            })}

        </div>

    )
}

export default GridRow

