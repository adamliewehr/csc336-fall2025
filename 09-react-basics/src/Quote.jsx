import { useState } from 'react'
import ColorInput from './ColorInput.jsx'


function Quote(item) {

    const [color, setColor] = useState('');

    return (
        <div>
            <ColorInput color={color} setColor={setColor} />
            <li style={
                {
                    color: color
                }
            }>
                {item.text}
            </li>

        </div>
    )
    
}

export default Quote

