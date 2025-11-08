import { useState } from 'react'
import "./TodoItem.css"


function TodoItem({todo}) {
  
  
  return (
    
    <li style={
            {
                textDecoration: todo.complete ? "line-through" : "none"
            }
        }>
        {todo.task}
      


    </li>
  )
}

export default TodoItem
