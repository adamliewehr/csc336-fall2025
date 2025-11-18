import { useState } from 'react'
import GridNumber from './gridNumber'

function GridRow({rowContents}) { // will take in a list of GridNumbers


    return (

        <div className="flex-container">
            

            {rowContents.map((item) =>{
                // {console.log(item.number)}
                // return <h1>{item.number}</h1>
                return <GridNumber
                key = {item.number}
                num = {item.number}>
                </GridNumber>


            })}
            
        </div>

    )
}

export default GridRow

