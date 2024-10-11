import { Link } from "react-router-dom";
import '../styles/index.scss'

const PetCard = ({ pet }) => {
    return  (
        <div className="pet-card">
            <Link to={`/pet/${pet.id}`}>
                <img src={pet.pic} alt={pet.breed} />
                <div className="pet-info">
                    <h3>{pet.name}</h3>
                    <p>{pet.age}</p>
                </div>
            </Link>
        </div>
    )
}

export default PetCard