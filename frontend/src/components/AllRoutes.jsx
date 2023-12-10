import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Navbar from './Navbar'
import Dashboard from '../pages/Dashboard'
import Product from '../pages/Product'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/product/:id' element={<Product/>}/>
      </Routes>
    </>
  )
}

export default AllRoutes
