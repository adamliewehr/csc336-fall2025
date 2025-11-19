import { useState, useEffect, useRef } from 'react'
import GridBox from './gridBox'


function GridRow({ rowContents, rowIndex, lastRow, turn, changePlayer, dimension }) { // will take in a list of GridBoxes

    const [gridRowData, setGridRowData] = useState(Array(dimension).fill([""]).flat());

    const [gridBoxData, setGridBoxData] = useState(null);


    function handleChildData(data) {
        setGridBoxData(data);
    };

    useEffect(() => {

        try {
            setGridRowData(
                gridRowData.map((box, index) => {

                    if (index == gridBoxData.cord[1]) {
                        return gridBoxData.boxContents;

                    }
                    return box;

                    // return gridRowData[gridBoxData.cord[1]] = gridBoxData.boxContents;



                })

            )

            // console.log(gridRowData);
            // console.log(`row: ${rowIndex}, ${gridRowData}`);
            // console.log(gridBoxData);

        }
        catch {
            console.log('ignore this goofy ahh react error');
        }

    }, [gridBoxData])


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
                    childData={handleChildData}>

                </GridBox>


            })}
            {/* FOR TESTING (ITS WORKING) */}
            {gridRowData.map((item)=> {
                    return <p>{item}</p>
                })}





        </div>



    )
}

export default GridRow

