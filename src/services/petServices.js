const BACKEND_URL = 'http://localhost:3000';

const populatePets = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/pets`, {
            method: 'GET',
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

const populateUserPets = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/profiles/:userId`, {
            method: 'GET',
        })
        const json = await res.json();
        if (json.error) {
            throw new Error(json.error)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default {populatePets, populateUserPets}