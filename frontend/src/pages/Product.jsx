import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { FaCartShopping } from 'react-icons/fa6'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AddToCart } from '../redux/cartReducer/action'
import useShowToast from '../hooks/useShowToast'

const Product = () => {
    const {token}=useSelector((store)=>{
      return {
        token:store.authReducer.token
      }
    },shallowEqual)
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const showToast=useShowToast()
    useEffect(() => {
        const getProduct = async (id) => {
            try {
                setLoading(true)
                const res = await fetch(`${api}/product/${id}`)
                const data = await res.json()
                setProduct(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getProduct(id)
    }, [id])

    const handleAddToCart=()=>{
        if(!token){
            showToast("Error","Please login first!","error")
            navigate("/auth")
        }else{
            const data={
                token,
                item:{
                    productId:product._id,
                    quantity:1
                }
            }
            console.log(data)
            dispatch(AddToCart(data)).then((res)=>{
                if(res._id){
                    showToast("Success","Product added to cart","success")
                  }else{
                    showToast("Warning",res.error,"warning")
                  }
            })
        }
    }
    return (
        <div>
            <Flex w={"80%"} m={'auto'} flexDir={{xl:"row",lg:"row",md:"row",sm:"column",base:"column"}}>
                <Box
                    p={"20px"} borderRadius={"5px"} cursor={"pointer"}
                    w={{xl:"50%",lg:"50%",md:"50%",sm:"100%",base:"100%"}}
                >
                    <Flex justifyContent={"center"} p={"20px"} border={"1px solid #bdbdbd"} borderRadius={"10px"} h={{xl:"450px",lg:"450px",md:"400px",sm:"",base:""}}>
                        <Image src={product?.image} w={"100%"} borderRadius={"5px"} />
                    </Flex>
                </Box>
                <Box w={{xl:"50%",lg:"50%",md:"50%",sm:"100%",base:"100%"}}>
                    <Text fontWeight={600} fontSize={"20px"} color={"#515151"}>
                        {product?.name}
                    </Text>
                    <br />
                    <hr />
                        <Text fontWeight={700} fontSize={"24px"}>Price : ₹{product?.price}</Text>
                        <br />
                        <Text fontWeight={700} fontSize={"18px"} color={"#515151"}>Quantity : {product.quantity}</Text>
                        <br />
                        <Text fontWeight={700} fontSize={"18px"} color={"#515151"}>Weight : {product.weight}</Text>
                        <br />
                        <Text fontWeight={700} fontSize={"24px"} color={"#000000"}>Description</Text>
                        <hr />
                        <br />
                        <Text color={"#000000"}>{product?.description}</Text>

                    <Flex justifyContent={"center"} mt={"5px"}>
                        <Button colorScheme='blue' display={"flex"} alignItems={"center"} gap={"10px"} w={"full"} onClick={handleAddToCart}>
                            <FaCartShopping />
                            <Text>Add to Cart</Text>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
            <br />
            <br />
        </div>
    )
}

export default Product
