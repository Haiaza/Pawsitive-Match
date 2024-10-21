import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService'

const Signin = (props) => {
    const navigate = useNavigate(); // added this for navigation purposes
    const [message, setMessage] = useState(['']);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
});

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        updateMessage('');
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const user = await authService.signIn(userData);

        props.setUser(user);
        navigate('/');
        } catch (err) {
        updateMessage(err.message);
        }
    };

    return (
        <main >
        <h1>Log In</h1>
        <p>{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className='col-form-label-sm'>
            <label htmlFor="email">Username:</label>
            <input
                type="text"
                autoComplete="off"
                id="username"
                value={userData.username}
                name="username"
                onChange={handleChange}
            />
            </div>
            <div className='col-form-label-sm'>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                autoComplete="off"
                id="password"
                value={userData.password}
                name="password"
                onChange={handleChange}
            />
            </div>
            <div>
            <button className="btn btn-outline-primary">Log In</button>
            <Link to="/">
                <button className="btn btn-outline-secondary">Cancel</button>
            </Link>
            </div>
        </form>
        </main>
    );
};

export default Signin;
