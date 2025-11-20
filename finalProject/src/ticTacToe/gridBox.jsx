import { useState, useEffect } from 'react'


function GridBox({ rowIndex, colIndex, lastRow, lastCol, turn, changePlayer, childData}) {

    const [boxContents, setBoxContents] = useState("_");
    const [clicked, setClicked] = useState(false);
    const [cords, setCords] = useState([rowIndex, colIndex]);

    useEffect(() => {
        childData(
            {
            boxContents: boxContents,
            cord: cords
            }
            
        );
    }, [boxContents])


    let boxStyle = {
        width: "100px",
        height: "100px",
        border: "5px solid white",


        // if square is in the top row, make the top of the border none,
        // if the square is in the bottom row, make the bottom of the border none
        // if the square is on the side, make the left/right border none
        // anywhere else, the border should be on all sides

        borderTopStyle: rowIndex == 0 ? 'none' : 'solid',
        borderBottomStyle: lastRow == true ? 'none' : 'solid',
        borderLeftStyle: colIndex == 0 ? 'none' : 'solid',
        borderRightStyle: lastCol == true ? 'none' : 'solid',


    }

    const handleClick = () => {
        // if its player 1s turn, we put a blue X in the gridNumber

        if (!clicked) {
            if (turn==1) { // it's player 1s turn
                // put a blue X
                setBoxContents("X");
            }
            else { // player 2s turn
                // put a red O
                setBoxContents("O");

            }

        setClicked(true);
        changePlayer();


        }

    };

    return (

        <div style={boxStyle}
            onClick={handleClick}>

            <h1
            >{boxContents=="_" ? "" : boxContents}</h1>

            {/* {clicked ? "clicked" : "not clicked"} */}
            

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

export default GridBox

