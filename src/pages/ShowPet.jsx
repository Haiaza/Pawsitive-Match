
// profiles/:userId/pets

import * as petServices from '../services/petServices'
import PetCard from '../components/PetCard'

const adoptedList = petServices.populateUserpets()

const UserPets = ({ user }) => {
    adoptedList
    
    const List = user.adoptedPets

    return (
        <>
        <h1>Your new friends</h1>
        {List.map((pet) => <PetCard pet={pet} key={pet.id} /> )}
        </>
    )
}

export default UserPets