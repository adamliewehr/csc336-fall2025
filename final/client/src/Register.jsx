import { useState, useEffect } from 'react'


function Register() {

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });

    function handleChange(e) {
        setLoginInfo(prevInfo => ({
            ...prevInfo,
            [e.target.name]: e.target.value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault(); // Stops the page reload

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo),
            });

            if (!response.ok) {
                // Handle 401 Unauthorized errors here
                throw new Error(`Login failed with status: ${response.status}`);
            }

            const data = await response.json();

            console.log('Registration Successful! Please log in.');
            alert("Registration Successful! Please log in.")

        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };

    function showPassword() {
        let password = document.getElementById("password");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }


    return (

        <div>

            <h1>Register</h1>


            <form onSubmit={handleSubmit}>

                <label htmlFor="username">Username:</label>


                <input
                    type="text"
                    id="username"
                    name="username"
                    value={loginInfo.username}
                    onChange={handleChange}
                />


                <br />


                <label htmlFor="password">Password:</label>


                <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                />


                <br />
                <input type="checkbox" onClick={showPassword} />Show Password
                <br />


                <input type="submit" value="Log in" />

            </form>






        </div>

    )
}



export default Register

