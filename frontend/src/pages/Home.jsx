import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productReducer/action'
import { Box, Grid, Heading, Image } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const Home = () => {
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
                            <Image src="https://img.freepik.com/premium-vector/online-shopping-banner-via-cellphone-suitable-ecommerce-promotions_541170-3175.jpg?w=1380" borderRadius={"5px"}
                            boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                            />
                            <br />
                            <Box display={"grid"} gridTemplateColumns={{ xl: 'repeat(4,1fr)', lg: 'repeat(4,1fr)', md: 'repeat(2,1fr)', sm: 'repeat(1,1fr)', base: 'repeat(1,1fr)' }}
                                gap={"20px"}
                            >
                                {
                                    products?.map((product) => (
                                        <Box key={product._id}>
                                            <ProductCard product={product} />
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                }
            </Box>
            <br />
            <br />
        </div>
    )
}

export default Home
