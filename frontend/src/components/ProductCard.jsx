import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddToCart } from '../redux/cartReducer/action';
import useShowToast from '../hooks/useShowToast';

const ProductCard = ({product}) => {
    const {token}=useSelector((store)=>{
        return {
            token:store.authReducer.token
        }
    },shallowEqual)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const showToast=useShowToast()

  const handleAddToCart=(e)=>{
    e.preventDefault()
    if(!token){
        showToast("Error","Please login first","error")
        navigate("/auth")
    }else{
        const data={
            token,
            item:{
                productId:product._id,
                quantity:1
            }
        }
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
    <Link to={`/product/${product._id}`}>
    <div>
      <Box boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
      p={"20px"} borderRadius={"5px"} cursor={"pointer"}
      >
        <Flex justifyContent={"center"} p={"5px"}>
          <Image src={product.image} h={"200px"} borderRadius={"5px"}/>
        </Flex>
        <Text fontWeight={600} noOfLines={1} color={"#515151"}>
          {product.name}
        </Text>
        <Flex alignItems={"center"} gap={"10px"} justifyContent={"space-between"} mt={"4px"}>
            <Text fontWeight={700} fontSize={"18px"}>₹{product.price}</Text>
            <Text fontWeight={700} fontSize={"16px"} color={"#515151"}>Qty : {product.quantity}</Text>
        </Flex>
        <Flex justifyContent={"center"} mt={"5px"}>
         <Button colorScheme='blue' display={"flex"} alignItems={"center"} gap={"10px"} w={"full"} onClick={handleAddToCart}
         >
          <FaCartShopping/>
          <Text>Add to Cart</Text>
         </Button>
        </Flex>
      </Box>
    </div>
    </Link>
  )
}

export default ProductCard
