import { Box, Button, Flex, SelectField, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import OrderCard from './OrderCard'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { updateOrderStatus } from '../redux/dashboardOrderReducer/action'
import useShowToast from '../hooks/useShowToast'

const DashboardOrderItem = ({ item }) => {
    const { token } = useSelector((store) => {
        return {
            token: store.authReducer.token
        }
    }, shallowEqual)
    const dispatch = useDispatch()
    const [orderStatus,setOrderStatus]=useState(item.status)
    const [loading,setLoading]=useState(false)
    const showToast=useShowToast()
    const handleUpdate=()=>{
        const data={
          token,
          status:orderStatus,
          orderId:item._id
        }
        setLoading(true)
        dispatch(updateOrderStatus(data)).then((res)=>{
            if(res.message){
             showToast("Success",res.message,"success")
            }
            setLoading(false)
        })
    }
    return (
        <div>
            <Box w="100%" boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} p={"10px"} borderRadius={"10px"} border={item.status == "Pending" ? "1px solid #ff6600" : item.status == "Processing" ? "1px solid #ddff00" : item.status == "Shipped" ? "1px solid #bcff03" : "1px solid #00ff1e"}>
                <Flex justifyContent={"space-between"} p={"5px"} borderRadius="5px" mb={"5px"}>
                    <Text fontSize={"12px"} fontWeight={500}>CustomerId : {item.customerId}</Text>
                    <Text fontSize={"12px"} fontWeight={500}>OrderId : {item._id}</Text>
                </Flex>
                <Flex justifyContent={"space-between"} p={"5px"} bgColor={item.status == "Pending" ? "#ff6600" : item.status == "Processing" ? "#ddff00" : item.status == "Shipped" ? "#bcff03" : "#00ff1e"} borderRadius="5px">
                    <Text fontSize={"18px"} fontWeight={600}>Status : {item.status}</Text>
                    <Text fontSize={"18px"} fontWeight={600}>Order Value : ₹{item.totalPrice}</Text>
                </Flex>
                {
                    item?.items.map((order) => (
                        <div key={order._id}>
                            <OrderCard item={order} />
                        </div>
                    ))
                }
                <br />
                <Flex alignItems={"center"} p={"5px"} borderRadius="5px" mb={"5px"} gap={"20px"}>
                    <Flex gap={"5px"} alignItems={"center"}>
                        <Text fontSize={"18px"} fontWeight={500}>Update Order Status :</Text>
                        <SelectField value={orderStatus} onChange={(e)=>setOrderStatus(e.target.value)}
                        border={"1px solid #888888ff"}
                        borderRadius={"5px"}
                        p={"5px"}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </SelectField>
                    </Flex>
                    <Button colorScheme='blue' onClick={handleUpdate} isLoading={loading}>Update</Button>
                </Flex>
                <Flex alignItems={"center"} p={"5px"} borderRadius="5px" mb={"5px"} gap={"20px"} fontSize={"16px"} fontWeight={600} color={"#009819"} justifyContent={"space-between"}>
                    <Text>Payment Status : </Text>
                    <Text>{item.payment=="paid"?"Online Paid":"Cash on delivery"}</Text>
                </Flex>
            </Box>
        </div>
    )
}

export default DashboardOrderItem
