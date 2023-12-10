import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { descreaseQTY, increaseQTY } from '../redux/cartReducer/action'

const CartItem = ({ item }) => {
    const {token}=useSelector((store)=>{
        return {
            token:store.authReducer.token,
        }
    },shallowEqual)
    const dispatch=useDispatch()
    const handleIncrease=()=>{
        const data={
           token,
           itemInfo:{
            productId:item.productId._id,
            quantity:item.quantity+1
           }
        }
        dispatch(increaseQTY(data))
    }
    const handleDecrease=()=>{
        const data={
            token,
            itemInfo:{
             productId:item.productId._id,
             quantity:item.quantity-1
            }
         }
         dispatch(descreaseQTY(data))
    }
    return (
        <Flex boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} p={"10px"} mt={"20px"} borderRadius={"5px"}>
            <Flex p="10px" borderRight={"1px solid #959595"} alignItems={"center"} justifyContent={"center"} w={"100px"} h={"100px"}>
                <Image w={"100px"} borderRadius="5px" src={item.productId.image} />
            </Flex>
            <Box p={"10px"} w={"100%"}>
                <Flex  alignItems={"center"} justifyContent={"space-between"}>
                <Text noOfLines={1} fontWeight={600} color={"#757575"}>{item.productId.name}</Text>
                <DeleteIcon color={"red"} cursor={"pointer"}/>
                </Flex>
                <Text fontSize={"16px"} fontWeight={700}>₹{item.productId.price}</Text>
                <Flex justifyContent={"space-between"}>
                    <Text>Weight: {item.productId.weight}</Text>
                    <Flex gap={"5px"}>
                        <Text>Qty : </Text>
                        <Button size={"xs"} fontWeight={700} onClick={handleDecrease}>-</Button>
                        <Text>{item.quantity}</Text>
                        <Button size={"xs"} fontWeight={700} onClick={handleIncrease} >+</Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default CartItem
