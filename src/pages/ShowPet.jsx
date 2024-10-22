import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import petServices from '../services/petServices';
import PetCard from '../components/PetCard';
import { Link } from 'react-router-dom';

const ShowPet = () => {
    const { id } = useParams(); // Get the pet ID from the URL
    const [pet, setPet] = useState(null);
    
    console.log(id)

    useEffect(() => {
        const fetchPet = async () => {
            const fetchedPet = await petServices.specificPet(id); // Assuming you have a service to get pet by ID
            setPet(fetchedPet);
            console.log(fetchedPet)
        };
        fetchPet();
    }, [id]);

    const adoptionLink = window.location.href + '/adoption'
    
    if (!pet) return <p>Loading...</p>;

    return (
        <>
            <PetCard pet={pet}/>
            <button className='btn'><Link to={adoptionLink}><h3>Adopt me!</h3></Link></button>
        </>
    );
};

export default ShowPet;
