import React, { useEffect } from 'react'
import { api } from '../api'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Box, Heading, Text } from '@chakra-ui/react'
import { getAllOrders } from '../redux/dashboardOrderReducer/action'
import DashboardOrderItem from '../components/DashboardOrderItem'
import CartLoader from '../components/CartLoader'

const AllOrders = () => {
  const { token, allOrders, loading } = useSelector((store) => {
    return {
      token: store.authReducer.token,
      allOrders: store.dashboardOrderReducer.allOrders,
      loading: store.dashboardOrderReducer.loading
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrders(token))
  }, [token])
  const arr=[1,2,3,4]
  return (
    <div>
      {
        loading ?
        <Box w={"80%"} m={"auto"}>
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
        <Box>
        {
          allOrders?.length == 0
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
      </Box>
      }
    </div>
  )
}

export default AllOrders
