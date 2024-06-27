import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import View from './pages/View'
import Edit from './pages/Edit'
import Delete from './pages/Delete'
const App = () => {
  console.clear();
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="view/:id" element={<View/>}/>
      <Route path="edit/:id" element={<View/>}/>
      <Route path="delete/:id" element={<Delete/>}/>
    </Routes>
    <Footer/> 
    </>
  )
}

export default App
