

import { useState, useEffect } from 'react'
import petServices from '../services/petServices';
import PetCard from '../components/PetCard'

const UserPets = ({ user }) => {
    const [adoptedList, setAdoptedList] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPets = async () => {
            console.log(user)
        try {
            const userAndPets = await petServices.populateUserPets({ user });
            const { adoptedPets } = userAndPets.user
            console.log(adoptedPets)

            const petDetails = await Promise.all(
                adoptedPets.map((petObj) => {
                    const petData = petServices.specificPet(petObj._id)
                    console.log(petObj)
                    return petData
                }
            ) 
        )
            console.log(petDetails)

            setAdoptedList(petDetails);
            console.log(adoptedList)
            console.log(user)
            
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
        {adoptedList.map((pet,idx) => (
            <PetCard pet={pet} key={idx} />
        ))}
    </>
    );
};

export default UserPets