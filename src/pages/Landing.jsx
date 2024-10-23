import { Link } from "react-router-dom"
import '../styles/index.scss'
import { useEffect, useState } from "react"

const Landing = () => {

    const [dogSrc, setDogSrc] = useState("")

    const randomDogImg = async () => {
        const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
        const data = await res.json()
        
        
        setDogSrc(data.message)
    }

    useEffect(() => {
        randomDogImg()
    }, [])

    return (
    <div className="hero-container prociono-regular">
        <h1>Pawsitive Match</h1>
        <p>Find Your Furry Forever Friend!</p>
        <Link to={"/signup"}>
            <button className="btn btn-outline-dark"><img src={ dogSrc } alt="randomDog" /></button>
        </Link>
    </div>
    )
}
export default Landing
