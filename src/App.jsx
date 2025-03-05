import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppHome from './pages/home'
import AppContact from './pages/contact'
import AppAbout from './pages/about'

export const projurl = import.meta.env.DEV ? '/' : '/react-router-test/'

function App() {


  return (

    <div>
    <BrowserRouter 
    basename={projurl}
    >
      <head>
        <ul>
          <li><a href= {projurl + 'about'}>About</a></li>
          <li><a href= {projurl + 'contact'}>Contact</a></li>  
        </ul>
      </head>
      <Routes>
        <Route path='/' element={<AppHome />} ></Route>
        <Route path='/about' element={<AppAbout />} ></Route>
        <Route path='/contact' element={<AppContact />} ></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
