import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppHome from './pages/home'
import AppContact from './pages/contact'
import AppAbout from './pages/about'

// export const projurl = import.meta.env.DEV ? '/' : '/react-router-test/'
export const projurl = '/react-router-test/'

function App() {


  return (

    <div>
      <nav>
      <ul style={{marginBottom:"60px"}}>
          <li style={{display:"inline"}}><a href= {projurl}>Home |</a></li>
          <li style={{display:"inline", marginLeft:"10px"}}><a href= {projurl + 'about'}>About |</a></li>
          <li style={{display:"inline", marginLeft:"10px"}}><a href= {projurl + 'contact'}>Contact</a></li>  
        </ul>
      </nav>
    <BrowserRouter 
    basename={projurl}>
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
