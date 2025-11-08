import { useState } from 'react'
import "./ListItem.css"


function ListItem({item}) {
  
  
  return (
    
    <li style={
            {
                textDecoration: item.important ? "line-through" : "none"
            }
        }>
        {item.text}
      


    </li>
  )
}

export default ListItem
