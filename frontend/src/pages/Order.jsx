import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { shallowEqual, useSelector } from 'react-redux'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import CartItem from '../components/CartItem'
import OrderItem from '../components/OrderItem'
import CartLoader from '../components/CartLoader'

const Order = () => {
  const { user, token } = useSelector((store) => {
    return {
      user: store.authReducer.user,
      token: store.authReducer.token
    }
  }, shallowEqual)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${api}/order/customer/${user._id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const result = await res.json()
        setOrders(result)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [])
  const arr = [1, 2, 3, 4]
  return (
    <div>
      {
        loading ?
          <Box width={"80%"} m={"auto"}>
           {
              arr.map((el)=>{
                return (
                  <Box key={el} w={"100%"}>
                    <CartLoader/>
                  </Box>
                )
              })
             }
          </Box>
          :
          <Box width={"80%"} m={"auto"}>
            {
              orders?.length == 0
                ?
                <Heading textAlign={"center"}>No any order!</Heading>
                :
                <Box>
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

            }
          </Box>
      }
    </div>
  )
}

export default Order
