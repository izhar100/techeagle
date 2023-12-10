import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const OrderCard = ({item}) => {
  return (
      <Flex border={"1px solid #d0d0d0"} p={"10px"} mt={"20px"} borderRadius={"5px"}>
            <Flex p="10px" borderRight={"1px solid #959595"} alignItems={"center"} justifyContent={"center"} w={"100px"} h={"100px"}>
                <Image w={"100px"} borderRadius="5px" src={item.productId.image} />
            </Flex>
            <Box p={"10px"} w={"100%"}>
                <Flex  alignItems={"center"} justifyContent={"space-between"}>
                <Text noOfLines={1} fontWeight={600} color={"#757575"}>{item.productId.name}</Text>
                </Flex>
                <Text fontSize={"16px"} fontWeight={700}>₹{item.productId.price}</Text>
                <Flex justifyContent={"space-between"}>
                    <Text>Weight: {item.productId.weight}</Text>
                </Flex>
            </Box>
        </Flex>
  )
}

export default OrderCard
