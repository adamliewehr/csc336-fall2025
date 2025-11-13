import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import About from "./About.jsx";
import ToDoList from "./todolist.jsx";
import CatFactList from "./catFactList.jsx";

function App() {


  return (
    <>

      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <br />
          <Link to="/about">About</Link>
          <br />
          <Link to="/catfacts">Cat Facts</Link>

          
        </nav>

        <Routes>

          <Route path="/" element={<ToDoList/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/catfacts" element={<CatFactList/>}></Route>


        </Routes>


      </BrowserRouter>

      

      

    </>
  )
}

export default App
