import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import petServices from '../services/petServices';
import userServices from '../services/userServices';

const AdoptionForm = ({ user }) => {
    const navigate = useNavigate()
    const { id } = useParams() // petId
    const [pet, setPet] = useState(null);
    const [isAdopting, setIsAdopting] = useState(false)

    console.log(id)

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const fetchedPet = await petServices.specificPet(id); 
                setPet(fetchedPet);
                console.log(fetchedPet); 
            } catch (error) {
                console.log("Error fetching pet:", error); 
            }
        };
        fetchPet();
    }, [id]);
    
    const handleAdopt = async () => {
        setIsAdopting(true)

        try {
            const updatedPet = {...pet, isAdopted: true, adoptedBy: user._id }
            const savedPet = await petServices.updatePet(id, updatedPet)

            console.log(pet) //pet object
            console.log(pet._id) //pet object Id
            await petServices.specificPet(id, updatedPet)

            const updatedUser = {
                ...user,
                adoptedPets: [...(user.adoptedPets || []), id]
            }
            console.log(updatedUser)
            console.log(user)
            await userServices.updateUser(user._id, updatedUser) 

            setPet(savedPet)

        } catch (error) {
            console.log("Error during adoption:", error)
        }
    }

    console.log(pet)

    return ( 
        <div>
        {pet ? ( 
            <>
                <h2>{pet.name}</h2>
                <img src={pet.pic} alt={pet.name} />
                <p>This one is a pretty chill dude</p>
                
                {!pet.isAdopted ? ( // Show the adopt button only if the pet is not yet adopted
                        <button onClick={handleAdopt} disabled={isAdopting}>
                            {isAdopting ? "Adopting..." : "Adopt this pet"}
                        </button>
                    ) : (
                        <>
                            <p>This pet has already been adopted!</p>
                            <Link to="/dash">
                                <button className="btn btn-outline-secondary">Cancel</button>
                            </Link>
                        </>
                    )}
                </>
            ) : (
                <p>Loading pet details...</p> // i understand its importance, though i dont see why its exclusion crashes the entire thing
            )};
            </div>
    )
}



export default AdoptionForm;