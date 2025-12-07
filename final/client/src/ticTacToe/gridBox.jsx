import { useState, useEffect } from 'react'

function GridBox({ boxContents, rowIndex, colIndex, dimension, getBoxData }) {

    let boxStyle = {
        width: "100px",
        height: "100px",
        border: "5px solid red",


        // if square is in the top row, make the top of the border none,
        // if the square is in the bottom row, make the bottom of the border none
        // if the square is on the side, make the left/right border none
        // anywhere else, the border should be on all sides

        borderTopStyle: rowIndex == 0 ? 'none' : 'solid',
        borderBottomStyle: rowIndex == dimension - 1 ? 'none' : 'solid',
        borderLeftStyle: colIndex == 0 ? 'none' : 'solid',
        borderRightStyle: colIndex == dimension - 1 ? 'none' : 'solid',

    }

    function handleClick() {
        console.log("clicked", [rowIndex, colIndex])
        getBoxData(
            {
                cords: [rowIndex, colIndex]
            }
        );

    }

    return (

        <div style={boxStyle}
            onClick={handleClick}>

            <h1>{boxContents == "" ? "" : boxContents}</h1>

        </div>

    )
}

export default GridBox

