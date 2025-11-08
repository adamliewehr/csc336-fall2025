import { useState } from 'react'
import ColorInput from './ColorInput'


function ListItem(item) {

    const [color, setColor] = useState('');


    return (
        <div>
            <ColorInput color={color} setColor={setColor} />
            <p style={{ color: color, fontWeight: item.important ? 'bold' : 'normal' }}>
                {item.text}
            </p>

        </div>
    )
}

export default ListItem
