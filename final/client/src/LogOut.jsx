import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem('authToken');
        localStorage.removeItem('username');

        alert('You have been successfully logged out.')
        navigate('/');

        window.location.reload(false);
    }, [navigate]); // navigate is a dependency


    return null
}

export default Logout;