import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { shallowEqual, useSelector } from 'react-redux'
import { Box, Flex, Text } from '@chakra-ui/react'
import CartItem from '../components/CartItem'
import OrderItem from '../components/OrderItem'

const Order = () => {
  const {user,token}=useSelector((store)=>{
    return {
      user:store.authReducer.user,
      token:store.authReducer.token
    }
  },shallowEqual)
  const [orders,setOrders]=useState([])
  useEffect(()=>{
    const getOrders=async()=>{
      try {
        const res=await fetch(`${api}/order/customer/${user._id}`,{
           method:"GET",
           headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
           }
        })
        const result=await res.json()
        setOrders(result)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  },[])
  return (
    <div>
      <Box width={"80%"} m={"auto"}>
      <Text fontSize={"20px"} fontWeight={700} mb={"10px"}>My Orders</Text>
        {
          orders?.map((order) => (
            <div key={order._id}>
              <OrderItem item={order} />
              <br />
            </div>
          ))
        }
        <br />
      </Box>
    </div>
  )
}

export default Order
