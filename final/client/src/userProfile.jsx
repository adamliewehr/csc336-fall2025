import { useState, useEffect } from 'react'

function UserProfile() {

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {

        async function getUserData() {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('User not logged in. ');
                alert("user not logged in")
                return {}
            }

            try {
                const response = await fetch('http://localhost:3001/api/users/me', {
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

                // console.log(data.userInfo);

                return data.userInfo;

            }
            catch (error) {
                console.log(error);
            }
        };

        getUserData().then(data => setUserInfo(data))


    }, [])



    const currentUsername = localStorage.getItem('username');

    if (!userInfo.username) {
        return (
            <h1>Loading...</h1>
        )
    }


    return (
        <div>
            <h1>{userInfo.username} stats</h1>
            <h2>Games Played: {userInfo.gamesPlayed}</h2>
            <h2>Wins: {userInfo.wins}</h2>

            {/* {userInfo.gamesPlayed} */}


        </div>

    )


}



export default UserProfile

