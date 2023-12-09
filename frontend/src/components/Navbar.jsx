import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <Flex>
        <Flex justifyContent={"center"} alignItems={"center"}>
         <Heading>TechEagle</Heading>
        </Flex>
        <Flex>
            <Text>Home</Text>
            <Flex>
                <Button>Login</Button>
                <Button>Signup</Button>
            </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Navbar
