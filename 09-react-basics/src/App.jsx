import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import Home from "./Home.jsx";
import ToDoList from "./todolist.jsx";
import CatFactList from "./catFactList.jsx";

function App() {


  return (
    <>

      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <br />
          <Link to="/todolist">To-Do List</Link>
          <br />
          <Link to="/catfacts">Cat Facts</Link>

          
        </nav>

        <Routes>

          <Route path="/" element={<Home/>}></Route>
          <Route path="/todolist" element={<ToDoList/>}></Route>
          <Route path="/catfacts" element={<CatFactList/>}></Route>


        </Routes>


      </BrowserRouter>

      

      

    </>
  )
}

export default App
