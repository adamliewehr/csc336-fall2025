import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import './App.css'


import Home from './Home.jsx';
import TicTacToe_GameBoard from './ticTacToe/gameBoard.jsx';
import Login from './login.jsx';
import Register from './Register.jsx';
import UserProfile from './userProfile.jsx';
import GamePage from './Games.jsx';
import Logout from './LogOut.jsx';

function App() {

  const [userStatus, setUserStatus] = useState(localStorage.getItem('username'));


  useEffect(() => {
    function checkLoginStatus() {
      setUserStatus(localStorage.getItem('username'));
    };

    checkLoginStatus();


  }, []);




  return (
    <>

      <BrowserRouter> {/*basename={process.env.PUBLIC_URL was giving me an error*/}
        <nav>
          <div className='flex-container'>

            <NavLink to="/" className="navLink">Home</NavLink>

            {/* <NavLink to="/ticTacToe" className="navLink">Tic Tac Toe</NavLink> */}
            <NavLink to="/games" className="navLink">Game List</NavLink>


            {userStatus ?
              <>

                <NavLink to="/profile" className="navLink">{`Profile: ${userStatus}`}</NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </>
              :
              <>
                <NavLink to="/login" className="navLink">Login</NavLink>
                <NavLink to="/register" className="navLink">Register</NavLink>
              </>

            }


          </div>




        </nav>


        <Routes>
          <Route path="/" element={<Home />} />

          {/* <Route path="/ticTacToe" element={<TicTacToe_GameBoard />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
