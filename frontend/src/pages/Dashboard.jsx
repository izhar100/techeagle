import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productReducer/action'
import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { Flex} from '@chakra-ui/react';
import { FaBox, FaShoppingCart, FaRupeeSign } from 'react-icons/fa';
import DashboardProductCard from '../components/DashboardProductCard'
import Loader from '../components/Loader'
import { getAllOrders } from '../redux/dashboardOrderReducer/action'

const Dashboard = () => {
  const { loading, products,token } = useSelector((store) => {
    return {
      loading: store.productReducer.loading,
      products: store.productReducer.products,
      token:store.authReducer.token
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  const [totalOrder,setTotalOrder]=useState(0)
  const [revenue,setRevenue]=useState(0)
  useEffect(() => {
    dispatch(fetchProducts)
    dispatch(getAllOrders(token)).then((res)=>{
      setTotalOrder(res.length)
      console.log(res)
      let total=0
      res.forEach((item)=>{
         total+=item.totalPrice
      })
      setRevenue(total)
    })
  }, [])
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div>
      <Box w={"80%"} m={"auto"}>
        {
          loading
            ?
            <Grid gridTemplateColumns={{ xl: "repeat(4,1fr)", lg: "repeat(4,1fr)", md: "repeat(2,1fr)", sm: "repeat(1,1fr)", base: "repeat(1,1fr)" }} gap={"20px"}>
              {
                arr.map((el) => (
                  <Box key={el}>
                    <Loader />
                  </Box>
                ))
              }
            </Grid>
            :
            <Box>
              <Heading>Statistics</Heading>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                justifyContent={"space-between"}
                py={4}
                gap={"20px"}
                color={"white"}
              >
                <Box
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                  mb={{ base: 4, md: 0 }}
                  w={"100%"}
                  bgColor={"#950000"}
                >
                  <FaBox size={40} />
                  <Text mt={2} fontSize={"20px"} fontWeight={600}>
                    Total Products
                  </Text>
                  <Text fontSize={"20px"} fontWeight={700}>{products?.length}</Text>
                </Box>

                <Box
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                  mb={{ base: 4, md: 0 }}
                  w={"100%"}
                  bgColor={"#2600ff"}
                >
                  <FaShoppingCart size={40} />
                  <Text mt={2} fontSize={"20px"} fontWeight={600}>
                    Total Orders
                  </Text>
                  <Text fontSize={"20px"} fontWeight={700}>{totalOrder}</Text>
                </Box>
                <Box
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                  w={"100%"}
                  bgColor={"#128400"}
                >
                  <FaRupeeSign size={40} />
                  <Text mt={2} fontSize={"20px"} fontWeight={600}>
                    Estimated Revenue Generated
                  </Text>
                  <Text fontSize={"20px"} fontWeight={700}>₹{revenue}</Text>
                </Box>
              </Flex>
              <hr />
              <Text fontSize={"20px"} fontWeight={700} mb={"10px"}>All Inventories</Text>
              <Box display={"grid"} gridTemplateColumns={{ xl: 'repeat(4,1fr)', lg: 'repeat(4,1fr)', md: 'repeat(2,1fr)', sm: 'repeat(1,1fr)', base: 'repeat(1,1fr)' }}
                gap={"20px"}
              >
                {
                  products?.map((product) => (
                    <Box key={product._id}>
                      <DashboardProductCard product={product} />
                    </Box>
                  ))
                }
              </Box>
            </Box>
        }
      </Box>
    </div>
  )
}

export default Dashboard
