import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NavBar from './components/Navbar'
import AuthProvider from "./context/auth"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
