import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'     
import Signin from './pages/Signin'
import UserPets from './pages/UserPets'        
import ShowPet from './pages/ShowPet'                                                                                                                                                                                                                                         
import Navbar from './components/Navbar'
import { useState } from 'react'

import * as authService from './services/authService'


function App() {
  const [user, setUser] = useState(authService.getUser())

  console.log(user)
  
  return (
      <>
      <Navbar user = {user}/>
      <Routes>
        <Route path="/" element={<Landing /> } />
        <Route path='/dash' element = {<Dashboard />} /> 
        <Route path="/signup" element={<Signup setUser = {setUser} />} />
        <Route path="/signin" element={<Signin setUser = {setUser} />} />
        <Route path="/pets/:id" element={<ShowPet />} />
        <Route path="/profiles/:userId" element={<UserPets user={user}/>} />
      </Routes>
      </>
  )
}

export default App
