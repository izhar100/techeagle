import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Navbar from './Navbar'
import Dashboard from '../pages/Dashboard'
import Product from '../pages/Product'
import PrivateRoute from './PrivateRoute'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import AllOrders from '../pages/AllOrders'
import CustomerPrivateRoute from './CustomerPrivateRoute'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/cart' element={
          <CustomerPrivateRoute>
            <Cart />
          </CustomerPrivateRoute>
        } />
        <Route path='/order' element={
          <CustomerPrivateRoute>
            <Order />
          </CustomerPrivateRoute>
        } />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/dashboard/add' element={<PrivateRoute>
          <AddProduct />
        </PrivateRoute>} />
        <Route path='/dashboard/edit/:id' element={<PrivateRoute>
          <EditProduct />
        </PrivateRoute>} />
        <Route path='/dashboard/allorders' element={<PrivateRoute>
          <AllOrders />
        </PrivateRoute>} />
      </Routes>
    </>
  )
}

export default AllRoutes
