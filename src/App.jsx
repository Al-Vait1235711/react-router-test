import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppHome from './pages/home'
import AppContact from './pages/contact'
import AppAbout from './pages/about'
import HeaderComp from './pages/header'
import 'bootstrap/dist/css/bootstrap.min.css'

// export const projurl = import.meta.env.DEV ? '/' : '/react-router-test/'
export const projurl = '/react-router-test/'

function App() {


  return (

    <div>
      <header id='header'>
        <HeaderComp />
      </header>
      <main style={{ marginTop: "65px" }}>
        <BrowserRouter
          basename={projurl}>
          <Routes>
            <Route path='/' element={<AppHome />} ></Route>
            <Route path='/about' element={<AppAbout />} ></Route>
            <Route path='/contact' element={<AppContact />} ></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
