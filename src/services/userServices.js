const BACKEND_URL = 'https://pawsitive-backend.netlify.app/';

const updateUser = async (userId, updatedUser) => {
    const token = localStorage.getItem('token')

    try {
        const res = await fetch(`${BACKEND_URL}/users/${userId}/pets`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser),
        })
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

export default {updateUser}