import React, { useEffect } from 'react'
import { api } from '../api'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Box, Heading, Text } from '@chakra-ui/react'
import OrderItem from '../components/OrderItem'
import { getAllOrders } from '../redux/dashboardOrderReducer/action'
import DashboardOrderItem from '../components/DashboardOrderItem'

const AllOrders = () => {
    const {token,allOrders}=useSelector((store)=>{
        return {
            token:store.authReducer.token,
            allOrders:store.dashboardOrderReducer.allOrders
        }
    },shallowEqual)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getAllOrders(token))
    },[token])
  return (
    <div>
      {
        allOrders?.length==0
      ?
      <Heading textAlign={"center"}>No any order available!</Heading>
      :
      <Box width={"80%"} m={"auto"}>
      <Text fontSize={"20px"} fontWeight={700} mb={"10px"}>All Orders</Text>
        {
          allOrders?.map((order) => (
            <div key={order._id}>
              <DashboardOrderItem item={order} />
              <br />
            </div>
          ))
        }
        <br />
      </Box>
      }
    </div>
  )
}

export default AllOrders
