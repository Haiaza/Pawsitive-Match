import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import petServices from '../services/petServices';

const AdoptionForm = ({ user }) => {
    console.log(user)

    const navigate = useNavigate()
    const { id } = useParams() // petId
    const [pet, setPet] = useState(null);
    const [isAdopting, setIsAdopting] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                if (!localStorage.getItem('token')) {
                    throw new Error('Please log in to view pet details');
                }
                const fetchedPet = await petServices.specificPet(id);
                setPet(fetchedPet);
                console.log(fetchedPet)
            } catch (error) {
                if (error.message.includes('token')) {
                    setError("Authentication error. Please log in again.");
                    navigate('/login'); // if token is invalid,redirect to login 
                } else {
                    setError("Error fetching pet details: " + error.message);
                }
                console.log("Error fetching pet:", error);
            }
        };
        fetchPet();
    }, [id, navigate]);

    const handleAdopt = async () => {
        setIsAdopting(true) // 
        try {
            const response  = await petServices.updatePetAndUser({user,pet})
            setPet(response.pet); // Update pet in state
        }catch (error) {
            console.log("Error adopting pet:", error);
        } finally {
            setIsAdopting(false); // Reset loading state
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