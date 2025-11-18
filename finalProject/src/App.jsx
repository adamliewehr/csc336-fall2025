import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import './App.css'

import LineOfN_GameBoard from './lineOfN/gameBoard.jsx'
import Home from './Home.jsx';
import TicTacToe_GameBoard from './ticTacToe/gameBoard.jsx';

function App() {


  return (
    <>

      <BrowserRouter> {/*basename={process.env.PUBLIC_URL was giving me an error*/}
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/lineOfN">Line Of N</NavLink>
          <br />
          <NavLink to="/ticTacToe">Tic Tac Toe</NavLink>

        </nav>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lineOfN" element={<LineOfN_GameBoard />} />
          <Route path="/ticTacToe" element={<TicTacToe_GameBoard />} />


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
