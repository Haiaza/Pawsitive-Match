import { useState } from 'react';
import petServices from '../services/petServices';
import { useNavigate } from 'react-router-dom';

function PetSubmissionForm() {
    const navigate = useNavigate()
    const [message, setMessage] = useState([""])
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        pic: null,
        isAdopted: false
});

const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'pic') {
    setFormData({
        ...formData,
        [name]: files[0], // incase there are multiple imgs, we just want the 1st
    });
    } else {
    setFormData({
        ...formData,
        [name]: value,
    });
    }
};

const updateMessage = (msg) => {
    setMessage(msg)
}


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const pet = await petServices.submitPet(formData)
        setMessage("Pet submitted successfully!")
        console.log('New Buddy:', pet);
        console.log(pet)
        navigate('/dash')

    } catch (error) {
        updateMessage(error.message)
    }
    console.log('Form Data:', formData);
};

console.log(formData.pic)

return (
    <form onSubmit={handleSubmit}>
    <p>{message}</p>
    <div>
        <label htmlFor="name">Dog's Name:</label>
        <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        />
    </div>

    <div>
        <label htmlFor="breed">Breed:</label>
        <input
        type="text"
        id="breed"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        required
        />
    </div>

    <div>
        <label htmlFor="age">Age:</label>
        <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
        />
    </div>

    <button type="submit">Submit</button>
    </form>
);
}

export default PetSubmissionForm;
