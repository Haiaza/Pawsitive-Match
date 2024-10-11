import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'     
import Signin from './pages/Signin'                                                                                                                                                                                                                                                      
import Navbar from './components/Navbar'
import { useState } from 'react'



function App() {
  const [user, setUser] = useState(null)
  
  return (
      <>
      <Navbar user = {user}/>
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/signup" element={<Signup setUser = {setUser} />} />
        <Route path="/signin" element={<Signin setUser = {setUser} />} />
      </Routes>
      </>
  )
}

export default App
