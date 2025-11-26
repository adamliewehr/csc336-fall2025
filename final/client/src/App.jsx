import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


import './App.css'

import LineOfN_GameBoard from './lineOfN/gameBoard.jsx'
import Home from './Home.jsx';
import TicTacToe_GameBoard from './ticTacToe/gameBoard.jsx';
import Login from './login.jsx';
// import PisPizza from './pisPizza/PisPizza.jsx';

function App() {


  return (
    <>

      <BrowserRouter> {/*basename={process.env.PUBLIC_URL was giving me an error*/}
        <nav>
          <div className='flex-container'> {/* TODO: THIS IS ALSO BROKEN THE FLEX BOX CONTAINER*/}

            <NavLink to="/" className="navLink">Home</NavLink>
            {/* <NavLink to="/lineOfN">Line Of N</NavLink> */}
            <NavLink to="/ticTacToe" className="navLink">Tic Tac Toe</NavLink>
            <NavLink to="/login" className="navLink">Login</NavLink>

          </div>


          {/* <NavLink to="/pisPizza">π's Pizza</NavLink> */}

        </nav>


        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/lineOfN" element={<LineOfN_GameBoard />} /> */}
          <Route path="/ticTacToe" element={<TicTacToe_GameBoard />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/pisPizza" element={<PisPizza />} /> */}


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
