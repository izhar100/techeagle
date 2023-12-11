import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddToCart } from '../redux/cartReducer/action';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { deleteProduct } from '../redux/productReducer/action';
import useShowToast from '../hooks/useShowToast';

const DashboardProductCard = ({ product }) => {
    const { token } = useSelector((store) => {
        return {
            token: store.authReducer.token
        }
    }, shallowEqual)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const showToast=useShowToast()
    const [loading,setLoading]=useState(false)

    const handleDelete = (e) => {
        setLoading(true)
        dispatch(deleteProduct({token,id:product._id})).then((res)=>{
            if(res.message){
              showToast("Success",res.message,"success")
            }else{
              showToast("Error",res.error,"error")  
            }
            setLoading(false)
        })
    }
    const handleEdit=()=>{
        navigate(`/dashboard/edit/${product._id}`)
    }
    return (
        <div>
            <Box boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                p={"20px"} borderRadius={"5px"} cursor={"pointer"}
            >
                <Flex justifyContent={"center"} p={"5px"}>
                    <Image src={product.image} h={"200px"} borderRadius={"5px"} />
                </Flex>
                <Text fontWeight={600} noOfLines={1} color={"#515151"}>
                    {product.name}
                </Text>
                <Flex alignItems={"center"} gap={"10px"} justifyContent={"space-between"} mt={"4px"}>
                    <Text fontWeight={700} fontSize={"18px"}>₹{product.price}</Text>
                    <Text fontWeight={700} fontSize={"16px"} color={"#515151"}>Quantity : {product.quantity}</Text>
                </Flex>
                <Text noOfLines={3} mt={"5px"} color={"#515151"}>
                    {product.description}
                </Text>
                <Flex mt={"10px"} justifyContent={"space-between"}>
                    <Button colorScheme='blue' display={"flex"} alignItems={"center"} gap={"10px"} onClick={handleEdit}
                    >
                        <EditIcon />
                        <Text>Edit</Text>
                    </Button>
                    <Button colorScheme='red' display={"flex"} alignItems={"center"} gap={"10px"} onClick={handleDelete} isLoading={loading}
                    >
                        <DeleteIcon />
                        <Text>Delete</Text>
                    </Button>
                </Flex>
            </Box>
        </div>
    )
}

export default DashboardProductCard
