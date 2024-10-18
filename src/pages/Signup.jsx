import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as authService from '../services/authService'

    const Signup = (props) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState([""])
    const [userData, setUserData] = useState({
            username: '',
            email:'',
            password: '',
            passwordConf: ''
    })

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }


    const updateMessage = (msg) => {
        setMessage(msg)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await authService.signup(userData)

          props.setUser(user) // this will modify the state in the App component
          navigate('/') // upon redirect you will see the "Dashboard" page
        } catch (err) {
            updateMessage(err.message)
        }
    }

    const { username, password, passwordConf, email } = userData

    const isFormInvalid = () => {
        return !(username && email && password && password === passwordConf);
    }

    const isPWThere = () => {
        return !(password.length)
    }

    return (
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                type="text"
                    id="username"
                    value={username}
                    name="username"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                type="email"
                    id="email       "
                    value={email}
                    name="email"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        value={passwordConf}
                        name="passwordConf"
                        onChange={handleChange}
                        disabled={isPWThere()}
                    />
                </div>
                <div>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default Signup