import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    const {token,user}=useSelector((store)=>{
        return {
            token:store.authReducer.token,
            user:store.authReducer.user
        }
    },shallowEqual)
    const navigate=useNavigate()
    useEffect(()=>{
        console.log("Token:",token)
        console.log("User:",user)
    },[token,user])
  return (
    <>
      <Flex p={"8px"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex justifyContent={"center"} alignItems={"center"}>
         <Heading onClick={()=>navigate("/")} cursor={"pointer"}>TechEagle</Heading>
        </Flex>
        <Flex alignItems={"center"} gap={"20px"}>
            <Text fontWeight={600} cursor={"pointer"} onClick={()=>navigate("/")}>Home</Text>
            <Flex alignItems={"center"} gap={"10px"}>
                {
                    !token
                    ?
                    <Button onClick={()=>navigate("/auth")} size={'sm'} colorScheme='blue'>Login</Button>
                    :
                    <Button
                    onClick={()=>navigate("/cart")}
                    ><FaCartShopping/></Button>
                }
                {
                  token && <Button onClick={()=>navigate("/order")}>Order</Button>
                }
            </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Navbar
