

import { useState, useEffect } from "react"

function GamePage() {

    const [dropdownValue, setDropdownValue] = useState(null);
    const [tttDimension, setTttDimension] = useState("");
    const currentUsername = localStorage.getItem('username');
    const [gameInfo, setGameInfo] = useState({});

    const [currentGames, setCurrentGames] = useState([]);
    const [count, setCount] = useState(0);


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
            return {}
        }

        try {

            const response = await fetch('http://localhost:3001/api/getGames', {
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

            setGameInfo({
                "username": currentUsername,
                "gameName": dropdownValue,
                "gameSpecifications": {
                    "tttDimension": tttDimension
                },
                "gameState": "pending",
                "gameBoard": newTTTBoard


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
            return {}
        }

        try {

            const response = await fetch("http://localhost:3001/api/postGame", {
                method: 'POST',
                headers: {

                    // Attach the token to the Authorization header
                    'Authorization': `Bearer ${token}`, //  THE authMiddleware IS WHAT REQUIRES THIS
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameInfo),
            })

            // const data = await response.json();
            // console.log(data);


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

                // console.log(game)
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
                        Created by: {game.createdBy}
                        <br />
                        Game: {game.name}
                        <br />
                        {game.name == "Tic-Tac-Toe" ? `Dimension: ${game.gameSpecifications.tttDimension}` : null}

                    </div>
                )



            })}


        </div>
    )

}

export default GamePage