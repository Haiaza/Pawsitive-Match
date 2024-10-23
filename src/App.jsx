import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'     
import Signin from './pages/Signin'
import UserPets from './pages/UserPets'        
import ShowPet from './pages/ShowPet'
import PetSubmissionForm from './pages/PetSubMissionForm'                                                                                                                                                                                                                                         
import ApplicationForm from './pages/ApplicationForm'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'

import * as authService from './services/authService'
import petServices from './services/petServices'


function App() {
  const [myUser, setMyUser] = useState(authService.getUser())
  const [petDb, setPetDb] = useState([])

  console.log(myUser)
  
  useEffect(() => {
    
    const fetchPets = async () => {
      try {
          const res = await petServices.populatePets()
          setPetDb(res)
          return petDb
      } catch (error) {
        console.error('Error fetching:', error)
      }
    }

    fetchPets()
  },[])
  // console.log(petDb)
  console.log(localStorage.getItem('token'))
  
  return (
      <>
      <Navbar user = {myUser} setUser = {setMyUser}/>
      <Routes>
        <Route path="/" element={<Landing /> } />
        <Route path='/dash' element = {<Dashboard />} /> 
        <Route path="/signup" element={<Signup setUser = {setMyUser} />} />
        <Route path="/signin" element={<Signin setUser = {setMyUser} />} />
        <Route path="/pets/:id" element={<ShowPet user = {myUser} setUser = {setMyUser} />} />
        <Route path="/profiles/:userId" element={<UserPets user={myUser}/>} />
        <Route path='/pets/submit' element={<PetSubmissionForm />} />
        <Route path='/pets/:id/adoption' element={<ApplicationForm  user={myUser} />} />
      </Routes>
      </>
  )
}

export default App
