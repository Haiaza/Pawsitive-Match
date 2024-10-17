import '../styles/index.scss'petServices from '../services/petServices'
import PetCard from '../components/PetCard'
import { useState,useEffect } from 'react'


const Dashboard = () => {
    const [index, setIndex] = useState([])
    
    useEffect(() => {
        const fetchPets = async () => {
            const fetchedPets = await petServices.populatePets()
            setIndex(fetchedPets)
        }

        fetchPets()
    },[])


    return (
        <>
        <div className="hero-container">
            <img src="" alt="logoImage" />
            <h1>Pawsitive Match</h1>
            <p>Find Your Furry Forever Friend!</p>
        </div>
        <div className="pet-container">
            
        { index.map((pet) =>(
            <PetCard key={pet.id} pet={pet} />
        ))}
        </div>
        </>
    )
} 
export default Dashboard