import { Flex, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const CartLoader = () => {
    return (
        <div>
            <Flex alignItems={"center"} gap={"20px"} w={"100%"}>
            <Skeleton startColor='pink.500' endColor='blue.500' height='100px' w={"20%"} />
                <Stack w={"80%"}>
                    <Skeleton startColor='blue.500' height='20px' />
                    <Skeleton startColor='blue.500' height='20px' />
                    <Skeleton startColor='blue.500' height='20px' />
                </Stack>
            </Flex>
            <br />
        </div>
    )
}

export default CartLoader
