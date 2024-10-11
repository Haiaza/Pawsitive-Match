import '../styles/index.scss'
import * as petServices from '../services/petServices'
import PetCard from '../components/PetCard'


const Dashboard = () => {
    // const [pets, setPets] = useState([])

    const index = petServices.populatePets()

    return (
        <>
        <div className="hero-container">
            <img src="" alt="logoImage" />
            <h1>Pawsitive Match</h1>
            <p>Find Your Furry Forever Friend!</p>
        </div>
        <div className="pet-container">
            
        {index.map((pet) =>(
            <PetCard key={pet.id} pet={pet} />
        ))}
        </div>
        </>
    )
} 
export default Dashboard