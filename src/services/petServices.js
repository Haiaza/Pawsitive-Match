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

    const userId =  user._id
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN0cmluZyIsIl9pZCI6IjY3MDQ4Y2M4NGY2N2ZmYmUyYzk1MTQxYSIsImlhdCI6MTcyOTIyNzA0M30.FWAUyJfsmcvljZjgrfk3E_cIY8MLm2BRfFuTxmEBZY4"  //remove after testing 
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


const specificPet = async (id) => {
    console.log('specificPets is working')
    try {
        const res = await fetch(`${BACKEND_URL}/pets/${id}` , {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
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

export default {populatePets, populateUserPets , specificPet}