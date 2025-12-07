

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

function GamePage() {

    const [dropdownValue, setDropdownValue] = useState(null);
    const [tttDimension, setTttDimension] = useState("");
    const currentUsername = localStorage.getItem('username');
    const [gameInfo, setGameInfo] = useState({});
    const [currentGames, setCurrentGames] = useState([]);
    const [count, setCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {

        getAllGames().then(gamesList => {
            if (gamesList) {
                setCurrentGames(gamesList);
            }
        })
            .catch(error => {

                console.error("Error loading games list:", error);
            });

    }, [count]);

    function getGames() {
        setCount(count + 1);
    }

    async function getAllGames() {

        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('User not logged in. ');
            alert("user not logged in")
            navigate("/")
            return {}
        }

        try {

            const response = await fetch('/api/getGames', {
                method: 'GET',
                headers: {
                    // Attach the token to the Authorization header
                    'Authorization': `Bearer ${token}` //  THE authMiddleware IS WHAT REQUIRES THIS
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch user data. Status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {

        if (dropdownValue == "Tic-Tac-Toe") {
            const N = parseInt(tttDimension);
            const newTTTBoard = Array.from({ length: N }, () => Array(N).fill(""));
            const players = []
            players.push(currentUsername)

            setGameInfo({
                "username": currentUsername,
                "gameName": dropdownValue,
                "gameSpecifications": {
                    "tttDimension": tttDimension
                },
                "gameState": "pending",
                "gameBoard": newTTTBoard,
                "players": players,
                "numOfMoves": 0,
                "gameEnded": false


            })

            
        };



    }, [tttDimension])

    function dropdownValueSet() {
        setDropdownValue(document.getElementById("gameDropdown").value);

    }

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('User not logged in. ');
            alert("user not logged in")
            navigate("/")
            return {}
        }

        try {

            const response = await fetch("/api/postGame", {
                method: 'POST',
                headers: {

                    // Attach the token to the Authorization header
                    'Authorization': `Bearer ${token}`, //  THE authMiddleware IS WHAT REQUIRES THIS
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameInfo),
            });

            const data = await response.json();

            navigate(`/game/${data._id}`);

            


        } catch (e) {
            console.log(e)
        }
    }

    async function joinGame(gameId, playerJoining) {



        const joinInfo = {

            "gameID": gameId,
            "playerJoining": playerJoining

        }

        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('User not logged in. ');
            alert("user not logged in")
            navigate("/")
            return {}
        }

        try {

            const response = await fetch(`/api/games/${gameId}/join`, {
                method: 'PATCH',
                headers: {

                    // Attach the token to the Authorization header
                    'Authorization': `Bearer ${token}`, //  THE authMiddleware IS WHAT REQUIRES THIS
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(joinInfo),
            })

            navigate(`/game/${gameId}`);


        } catch (e) {
            console.log(e)
        }

    }


    return (
        <div>

            <h1>Post a game!</h1>

            <label htmlFor="gameDropdown">Choose a game:</label>
            <select onChange={dropdownValueSet} id="gameDropdown" name="gameDropdown">
                <option value="none">Select an option</option>
                <option value="Tic-Tac-Toe">Tic-Tac-Toe</option>

            </select>

            <br />

            {dropdownValue != "Tic-Tac-Toe" ? null : (
                <>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="dimension">Dimension:</label>
                        <input
                            type="text"
                            id="dimension"
                            name="dimension"
                            value={tttDimension}
                            onChange={(e) => setTttDimension(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>



                </>
            )}


            <h1>Game List: </h1>

            <input type="button"
                value="Reload Games"
                onClick={getGames} />


            {currentGames.map((game, index) => {

                // if the game is pending, make it one color
                // if its active, make it another color

                return (
                    <div
                        key={index}
                        style={

                            {
                                border: `5px solid ${game.gameState == "pending" ? "green" : "red"}`
                            }

                        }

                    >
                        <div>
                            Created by: {game.createdBy}
                            <br />
                            Game: {game.name}
                            <br />
                            {game.name == "Tic-Tac-Toe" ? `Dimension: ${game.gameSpecifications.tttDimension}` : null}

                        </div>

                        <input
                            type="button"
                            value="Join Game"
                            onClick={() => joinGame(game._id, currentUsername)}
                        />

                    </div>


                )



            })}


        </div>
    )

}

export default GamePage