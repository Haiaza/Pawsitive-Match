import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'                                                                                                                                                                                                                                                           
import { useState } from 'react'



function App() {
  const [user, setUser] = useState(null)
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup setUser = {setUser} />} />
    </Routes>
  )
}

export default App
