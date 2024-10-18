

import { useState, useEffect } from 'react'
import petServices from '../services/petServices';
import PetCard from '../components/PetCard'

const UserPets = ({ user }) => {
    const [adoptedList, setAdoptedList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPets = async () => {
        try {
            const pets = await petServices.populateUserPets({ user });
            console.log(pets)
            setAdoptedList(pets);
        } catch (err) {
            console.error('Error fetching user pets:', err);
            setError('Failed to load pets. Please try again later.');
            //strech goal inspired by Amazon - add sad golden retriever                         
        } finally {
            setLoading(false);
        }
    };
        if (user){

            fetchUserPets();
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
    <>
        <h1>Your new friends</h1>
        {adoptedList.map((pet) => (
            <PetCard pet={pet} key={pet.id} />
        ))}
    </>
    );
};

export default UserPets