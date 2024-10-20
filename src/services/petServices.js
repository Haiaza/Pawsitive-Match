const BACKEND_URL = 'http://localhost:3000';

const populatePets = async () => {
    console.log('populatePets is working')
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
    console.log('populateUserPets is working')

    console.log(user)
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


const specificPet = async (pet) => {
    try {
        const res = await fetch(`${BACKEND_URL}/pets/${pet}` , {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        });
        const json = await res.json()
        if (json.err) {
            throw new Error(json.err);
        }
        console.log(pet)
        return json;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const submitPet = async (pet) => {
    try {
        const res = await fetch(`${BACKEND_URL}/pets` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pet),
        });
        
        const json = await res.json()
        if (json.error) {
            throw new Error(json.error)
        }
        console.log(json)
        return json
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default {populatePets, populateUserPets , specificPet, submitPet}