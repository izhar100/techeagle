import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import OrderCard from './OrderCard'

const OrderItem = ({item}) => {
    console.log(item)
  return (
    <div>
      <Box w="100%" boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} p={"10px"} borderRadius={"10px"} border={item.status=="Pending"?"1px solid #ff6600":item.status=="Processing"?"1px solid #ddff00":item.status=="Shipped"?"1px solid #bcff03":"1px solid #00ff1e"}>
      <Flex justifyContent={"space-between"} p={"5px"} bgColor={item.status=="Pending"?"#ff6600":item.status=="Processing"?"#ddff00":item.status=="Shipped"?"#bcff03":"#00ff1e"} borderRadius="5px">
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
      </Box>
    </div>
  )
}

export default OrderItem
