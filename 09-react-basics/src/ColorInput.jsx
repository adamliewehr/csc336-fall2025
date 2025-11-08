import { useState } from 'react'

function ColorInput({ color, setColor }) {



    return (

        <input
            type="text"
            id="input"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
        />

    )
}

export default ColorInput

