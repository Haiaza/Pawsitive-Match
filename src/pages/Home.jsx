import { Link } from "react-router-dom"
import '../styles/index.scss'

const Home = () => {

    return (
    <div className="hero-container">
        <img src="" alt="logoImage" />
        <h1>Pawsitive Match</h1>
        <p>Find Your Furry Forever Friend!</p>
        <Link to={"/signup"}>
            <button className="btn btn-outline-dark"><img src="" alt="randomDog" /></button>
        </Link>
    </div>
    )
}
export default Home
