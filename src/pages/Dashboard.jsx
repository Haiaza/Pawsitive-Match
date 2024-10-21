import '../styles/index.scss'
import petServices from '../services/petServices'
import PetCard from '../components/PetCard'
import { useState,useEffect } from 'react'


const Dashboard = () => {
    const [index, setIndex] = useState([])
    
    

    useEffect(() => {

        const fetchPets = async () => {
            const fetchedPets = await petServices.populatePets()
            setIndex(fetchedPets)
            console.log(fetchedPets)
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
          <div className="container">
            <div className="row">
              {index.map((pet, idx) => (
                <div key={idx} className="col-md-4 mb-4">
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>
          </div>
        </>
      );
      
} 
export default Dashboard