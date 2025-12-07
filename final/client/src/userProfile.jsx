import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function UserProfile() {

    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    if (!token) {
        // navigate('/login', { replace: true }) prevents the user from hitting 'back'
        navigate('/login', { replace: true, state: { message: "Access denied. Please log in." } });
        return null; // Component returns null so it doesn't try to render JSX
    }

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {

        async function getUserData() {


            if (!token) {
                console.error('User not logged in. ');
                alert("user not logged in")
                navigate("/")
                return {}
            }

            try {
                const response = await fetch('/api/users/me', {
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


        </div>

    )


}



export default UserProfile

