const BACKEND_URL = 'http://localhost:3000';

const populatePets = async () => {
    
    try {
        const res = await fetch(`${BACKEND_URL}/pets`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        });
        const json = await res.json();
        if (json.err) {
            throw new Error(json.err);
        }
        return json;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const populateUserPets = async ({ user }) => {
    

    
    const userId =  user._id
    const token = `${localStorage.getItem('token')}`  
    try {
        const res = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },

        })
        const json = await res.json();
        if (json.error) {
            throw new Error(json.error)
        }
        return json;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const updatePetAndUser = async ({ user, pet }) => {

    const token = `${localStorage.getItem('token')}`  
    
    try {
        const res = await fetch(`${BACKEND_URL}/pets/adopt/${pet._id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },

        })
        const json = await res.json();
        if (json.error) {
            throw new Error(json.error)
        }
        return json;
    } catch (error) {
        console.log(error)
        throw error
    }
}


const specificPet = async (pet) => {
    try {
        const res = await fetch(`${BACKEND_URL}/pets/${pet}` , {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json()
        if (json.err) {
            throw new Error(json.err);
        }
        return json;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const submitPet = async (pet) => {
    try {
        // to match the API format
        const breed = pet.breed.toLowerCase().split(' ').reverse().join('/')

        // random dog image for the breed
        const imageRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        const imageData = await imageRes.json()

        if (imageData.status === 'success') {
            // Attach the fetched image URL to the pet object
            pet.pic = imageData.message
        } else {
            throw new Error('Breed not found or no image available')
        }

        const res = await fetch(`${BACKEND_URL}/pets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pet),
        });
        const data = await res.json()

    } catch (error) {
        console.log(error)
        throw error
    }
}

const updatePet = async (petId, updatedPet) => {

    const token = `${localStorage.getItem('token')}`

    try {
        const res = await fetch(`${BACKEND_URL}/users/${petId}/pets`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPet),
        });
        
        const json = await res.json()
        if (json.err) {
            throw new Error(json.err);
        }
        return json;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const deletePet = async (userId, petId) => {
    const token = `${localStorage.getItem('token')}`;

    try {
        const res = await fetch(`${BACKEND_URL}/profiles/${userId}/pets/${petId}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const json = await res.json();

        if (res.status === 404) {
            throw new Error(json.error);
        } else if (!res.ok) {
            throw new Error('Failed to delete pet');
        }

        return json;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {populatePets, populateUserPets , specificPet, submitPet, updatePet , updatePetAndUser, deletePet}