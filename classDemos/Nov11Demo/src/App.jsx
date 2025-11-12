import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import RandomPokemon from './RandomPokemon.jsx';
import Home from "./Home.jsx";
import About from "./About.jsx";

function App() {


  return (
    <>

      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <br />
          <Link to="/about">About</Link>
          <br />
          <Link to="/pokemon">Pokemon</Link>
        </nav>

        <Routes>

          <Route path="/" element={<Home></Home>}></Route>
          <Route path="about/" element={<About/>}></Route>
          <Route path="pokemon/" element={<RandomPokemon />}></Route>


        </Routes>


      </BrowserRouter>

      

    </>
  )
}

export default App
