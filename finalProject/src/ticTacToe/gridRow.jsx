import { useState, useEffect, useRef } from 'react'
import GridBox from './gridBox'


function GridRow({ rowContents, rowIndex, dimension, turn, changePlayer, getBoxData}) { // will take in a list of GridBoxes

    // const [gridRowData, setGridRowData] = useState(Array(dimension).fill(["_"]).flat());

    // const [gridBoxData, setGridBoxData] = useState(null);


    // function getBoxData(data) {
    //     setGridBoxData(data);
    // };

    // useEffect(() => {

    //     try {
    //         setGridRowData(
    //             gridRowData.map((box, index) => {

    //                 if (index == gridBoxData.cord[1]) {
    //                     return gridBoxData.boxContents;

    //                 }
    //                 return box;

    //                 // return gridRowData[gridBoxData.cord[1]] = gridBoxData.boxContents;



    //             })

    //         )

    //         rowData({
    //             index: rowIndex,
    //             rowData: gridRowData
    //         })

    //         // console.log(gridRowData);
    //         // console.log(`row: ${rowIndex}, ${gridRowData}`);
    //         // console.log(gridBoxData);

    //     }
    //     catch {
    //         console.log('ignore this goofy ahh react error');
    //     }

    // }, [gridBoxData])


    return (

        <div className="flex-container">


            {rowContents.map((item, index) => {

                return <GridBox
                    key={index}
                    boxContents = {item}
                    rowIndex={rowIndex}
                    colIndex={index}
                    turn={turn}
                    dimension = {dimension}
                    changePlayer={changePlayer}
                    getBoxData = {getBoxData}

                    >

                </GridBox>


            })}





        </div>



    )
}

export default GridRow

