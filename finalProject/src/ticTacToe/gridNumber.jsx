import { useState } from 'react'


function GridNumber({ rowIndex, colIndex, lastRow, lastCol }) {

    let textStyle = {
        width: "100px",
        height: "100px",
        border: "5px solid white",

        borderTopStyle: rowIndex == 0 ? 'none' : 'solid',
        borderBottomStyle: lastRow == true ? 'none' : 'solid',
        borderLeftStyle: colIndex == 0 ? 'none' : 'solid',
        borderRightStyle: lastCol == true ? 'none' : 'solid',


    }


    return (

        <div style={textStyle}>

            {/* ({rowIndex},
            {colIndex})
            <br />
            {`lastRow? ${lastRow == true ? 'true' : "false"}`}
            <br />
            {`lastCol? ${lastCol == true ? 'true' : "false"}`}
            <br /> */}





        </div>

    )
}

export default GridNumber

