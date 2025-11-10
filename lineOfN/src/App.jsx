import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import gameBoard from "./gameBoard.json"
import gridNumber from './gridNumber'

function App() {
  const [board, setBoard] = useState(gameBoard);

  return (
    <>

    <h1>Line of N</h1>

    {board}


      {/* {board.map((item, index) => (
        <gridNumber
          key = {index}
          text = {item}
        
        >
          
      
      ))} */}

    




      
    </>
  )
}

export default App
