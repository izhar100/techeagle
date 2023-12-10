import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productReducer/action'
import { Box, Heading, Text } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import DashboardProductCard from '../components/DashboardProductCard'

const Dashboard = () => {
  const { loading, products } = useSelector((store) => {
    return {
      loading: store.productReducer.loading,
      products: store.productReducer.products
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts)
  }, [])
  console.log("Product:", products)
  return (
    <div>
      <Box w={"80%"} m={"auto"}>
        {
          loading
            ?
            <Heading textAlign={"center"}>Loading...</Heading>
            :
            <Box>
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
