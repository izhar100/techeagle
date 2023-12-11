import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { HamburgerIcon } from '@chakra-ui/icons';
import { logout } from '../redux/authReducer/action';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

const Navbar = () => {
  const { token, user, cart } = useSelector((store) => {
    return {
      token: store.authReducer.token,
      user: store.authReducer.user,
      cart: store.cartReducer.cart
    }
  }, shallowEqual)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
  }, [token, user])

  const handleLogout = () => {
    dispatch(logout)
    navigate("/auth")
  }
  return (
    <>
      <Flex p={"8px"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Image src='https://assets-global.website-files.com/6284afcd3c8fe34dca52d136/62bfd7e69c25897f423bcdac_TechEagle%20new%20logo.svg' onClick={() => navigate("/")} h={{xl:"40px",lg:"40px",md:"40px",sm:"30px",base:"30px"}} cursor={"pointer"}/>
        </Flex>
        <Flex alignItems={"center"} gap={"20px"}>
          {
            !token && (<Button onClick={() => navigate("/auth")} colorScheme='blue'>Login</Button>)
          }
          {
            user?.userType == "customer" && (
              <Button
                size={{xl:"md",lg:"md",md:"md",sm:"sm",base:"sm"}}
                position={"relative"}
                onClick={() => navigate("/cart")}
              ><FaCartShopping />
                {cart?.length > 0 && (
                  <Text fontSize={"10px"} position={"absolute"} top={"0"} right={"2"} color={"red"}
                  >{cart?.length}</Text>
                )}
              </Button>
            )
          }
          {
            user?.userType == "customer" && (
              <Button size={{xl:"md",lg:"md",md:"md",sm:"sm",base:"sm"}} onClick={() => navigate("/order")}>My Order</Button>
            )
          }
          <Flex alignItems={"center"} gap={"10px"} display={{ xl: "flex", lg: "flex", md: "flex", sm: "none", base: "none" }}>
            {user?.userType == "manager" && (
              <Button onClick={() => navigate('/dashboard/add')}>Add Product</Button>
            )}
            {
              user?.userType == "manager"
              && (<Button onClick={() => navigate("/dashboard")}>Dashboard</Button>)
            }
            {
              user?.userType == "manager" && (
                <Button onClick={() => navigate("/dashboard/allorders")}>ALL Orders</Button>
              )
            }
          </Flex>
          {
            token && (
              <Button size={{xl:"md",lg:"md",md:"md",sm:"sm",base:"sm"}} colorScheme='red' onClick={handleLogout}>Logout</Button>
            )
          }
          {
            user?.userType=="manager" && (
              <Box display={{ xl: "none", lg: "none", md: "none", sm: "block", base: "block" }}>
                <Menu>
                  <MenuButton as={Button}>
                    <HamburgerIcon />
                  </MenuButton>
                  <MenuList>
                    {user?.userType == "manager" && (<MenuItem
                      onClick={() => navigate("/dashboard")}
                    >Dashboard</MenuItem>)}
                    {user?.userType == "manager" && (
                      <MenuItem onClick={() => navigate('/dashboard/add')}>Add Product</MenuItem>
                    )}
                    {
                      user?.userType == "manager" && (
                        <MenuItem onClick={() => navigate("/dashboard/allorders")}>ALL Orders</MenuItem>
                      )
                    }
                  </MenuList>
                </Menu>
              </Box>
            )
          }
        </Flex>
      </Flex>
    </>
  )
}

export default Navbar
