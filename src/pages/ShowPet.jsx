import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import petServices from '../services/petServices';
import PetCard from '../components/PetCard';
import { Link } from 'react-router-dom';

const ShowPet = ({user}) => {
    
    const [pet, setPet] = useState(null);
    
    const { id } = useParams(); // Get the pet ID from the URL
    useEffect(() => {
        const fetchPet = async () => {
            const fetchedPet = await petServices.specificPet(id); // Fetch pet by ID
            setPet(fetchedPet);
            
        };
        fetchPet();
    }, [id]);

    const adoptionLink = window.location.href + '/adoption';

    const handleDelete = async () => {
        try {
            
            const userId = user._id
            const petId = pet._id
            
            await petServices.deletePet(userId, petId); // Pass userId and petId
            
            
            alert('Pet prepared for their new home!');
        } catch (error) {
            console.error('Failed to delete the pet:', error);
            alert('Something went wrong while preparing the pet for their new home.');
        }
    };

    // Check if the pet is in the user's adoptedPets
    const isAdoptedByUser = user?.adoptedPets?.some(adoptedPet => adoptedPet._id === id);

    if (!pet) return <p>Loading...</p>;

    return (
        <>
            <PetCard pet={pet} />
            <button className="btn">
                <Link to={adoptionLink}>
                    <h3>Adopt me!</h3>
                </Link>
            </button>
            <button className="btn" onClick={() => handleDelete(pet._id)}>
                <h3>Ready to go home!?</h3>
            </button>
            {isAdoptedByUser && (
                <button className="btn" onClick={handleDelete}>
                    <h3>Prepare for New Home</h3>
                </button>
            )}
        </>
    );
};
export default ShowPet;
