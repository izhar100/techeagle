import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getCartItem } from '../redux/cartReducer/action'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import CartItem from '../components/CartItem'
import { placeOrder } from '../redux/orderReducer/action'
import useShowToast from '../hooks/useShowToast'
import { useNavigate } from 'react-router-dom'
import CartLoader from '../components/CartLoader'

const Cart = () => {
  const { token, cart } = useSelector((store) => {
    return {
      token: store.authReducer.token,
      cart: store.cartReducer.cart
    }
  }, shallowEqual)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const showToast = useShowToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    address: "",
    payment: "cod"
  })
  useEffect(() => {
    setLoading(true)
    dispatch(getCartItem(token)).then((res) => {
      setLoading(false)
    })
  }, [token])
  useEffect(() => {
    function getTotal() {
      let sum = 0;
      for (let i = 0; i < cart?.length; i++) {
        let price = cart[i].productId?.price * cart[i].quantity;
        sum += price;
      }
      setTotal(sum)
    }
    getTotal()
  }, [cart])

  const handlePlaceOrder = () => {
    const data = {
      token,
      orderData: {
        items: cart.map((item) => {
          return {
            productId: item.productId._id,
            quantity: item.quantity
          }
        }),
        totalPrice: total,
        payment: input.payment,
        deliveryAddress: input.address
      }
    }
    dispatch(placeOrder(data)).then((res) => {
      if (res.message) {
        showToast("Success", res.message, "success")
        navigate("/order")
      } else {
        showToast("Error", res.error, "error")
      }
    })
  }

  const arr = [1, 2, 3, 4, 5]
  return (
    <div>
      <Box>
        {
          loading ?
            <Box w={"80%"} m={"auto"}>
             {
              arr.map((el)=>{
                return (
                  <Box key={el} w={"100%"}>
                    <CartLoader/>
                  </Box>
                )
              })
             }
            </Box>
            :
            <Box>
              {
                !cart[0]?.productId ?
                  <Box w={"80%"} m={"auto"}>
                    <Heading textAlign={"center"}>No item in the cart !</Heading>
                  </Box>
                  :
                  <Box w={"80%"} m={"auto"}>
                    <Flex justifyContent={"space-between"}>
                      <Text fontSize={"18px"} fontWeight={600}>My Items</Text>
                      <Text fontSize={"18px"} fontWeight={600}>Total Price: ₹{total}</Text>
                    </Flex>
                    {
                      cart?.map((item) => (
                        <div key={item._id}>
                          <CartItem item={item} />
                        </div>
                      ))
                    }
                    <br />
                    <Box borderRadius={"10px"} bgColor={"#d9ffea"} p={"20px"}>
                      <FormControl isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input placeholder='Your Delivery Address...' border={"1px solid #3c3c3c"} type="text" value={input.address} onChange={(e) => setInput({ ...input, address: e.target.value })} />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Payment</FormLabel>
                        <RadioGroup defaultValue='cod'>
                          <Stack spacing={5} direction='row'>
                            <Radio colorScheme='red' value='paid' onChange={(e) => {
                              setInput({ ...input, payment: e.target.value })
                            }}>
                              Paid
                            </Radio>
                            <Radio colorScheme='green' value='cod' onChange={(e) => {
                              setInput({ ...input, payment: e.target.value })
                            }}>
                              Cash on Delivery
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                      <br />
                      <Flex justifyContent={"space-between"} alignItems={"center"} border={"1px solid #b0b0b0"}
                        p={"5px"} borderRadius={"5px"}
                      >
                        <Text fontSize={"20px"} fontWeight={600}>Total Price: ₹{total}</Text>
                        <Button colorScheme='blue' onClick={handlePlaceOrder}>Place Order</Button>
                      </Flex>
                    </Box>
                  </Box>
              }
            </Box>

        }
      </Box>

      <br />
    </div>
  )
}

export default Cart
