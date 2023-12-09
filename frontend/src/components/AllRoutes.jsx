import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import Cart from '../pages/Cart'
import Order from '../pages/Order'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
    </>
  )
}

export default AllRoutes
