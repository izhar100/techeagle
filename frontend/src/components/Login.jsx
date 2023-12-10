import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/authReducer/action'
import { useNavigate } from 'react-router-dom'
  
  export default function Login({handlePage}) {
    const {loading}=useSelector((store)=>{
        return {
            loading:store.authReducer.loading
        }
    },shallowEqual)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [showPassword,setShowPassword]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogin=async(req,res)=>{
        const loginData={
            email,password
        }
        dispatch(login(loginData)).then((res)=>{
            
            if(res.userType=="manager"){
                navigate("/dashboard")
            }else{
                navigate("/")
            }
        })
        
    }
    return (
      <Flex
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={1}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={6}
            w={{
                base: 'full',
                sm:"400px"
            }}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="text" value={email} onChange={(e)=>(setEmail(e.target.value))}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Login"
                  size="lg"
                  colorScheme='blue'
                  onClick={handleLogin} isLoading={loading}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account? <Link color={'blue.400'}
                  onClick={()=>handlePage("signup")}
                  >Signup</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }