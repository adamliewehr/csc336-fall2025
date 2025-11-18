import { useState } from 'react'

function GridNumber({ num }) {

    const [isClicked, setIsClicked] = useState(false);


    const handleClick = () => {
        console.log(`${num} was clicked`);
        
    };


    return (

        <div className='gridNumber'
        onClick={handleClick}>
            <p>{num}</p>
        </div>

    )
}

export default GridNumber

