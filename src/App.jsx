import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppHome from './pages/home'
import AppContact from './pages/contact'
import AppAbout from './pages/about'

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppHome />} ></Route>
        <Route path='/about' element={<AppAbout />} ></Route>
        <Route path='/contact' element={<AppContact />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
