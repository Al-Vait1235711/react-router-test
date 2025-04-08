import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppHome from './pages/home'
import AppContact from './pages/contact'
import AppAbout from './pages/about'
import HeaderComp from './pages/header'
import 'bootstrap/dist/css/bootstrap.min.css'
import WeathApp from './pages/weath'
import LoadinBarsApp from './pages/loadingbars'
import ModelViewPort from './pages/modelview/viewport'

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
            <Route path='/weather' element={<WeathApp />} ></Route>
            <Route path='/loadingbars' element={<LoadinBarsApp />} ></Route>
            <Route path='/modelview' element={<ModelViewPort />} ></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
