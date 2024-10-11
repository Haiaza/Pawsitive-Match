import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'     
import Signin from './pages/Signin'
import ShowPet from './pages/ShowPet'                                                                                                                                                                                                                                                     
import Navbar from './components/Navbar'
import { useState } from 'react'



function App() {
  const [user, setUser] = useState(null)
  
  return (
      <>
      <Navbar user = {user}/>
      <Routes>
        <Route path="/" element={<Home /> } />
        {/* <Route path='/testing' element = {<Dashboard />} /> test with internet */}
        <Route path="/signup" element={<Signup setUser = {setUser} />} />
        <Route path="/signin" element={<Signin setUser = {setUser} />} />
        <Route path="/profiles/:userId/pets" element={<ShowPet />} />
      </Routes>
      </>
  )
}

export default App
