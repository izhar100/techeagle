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
  
  export default function Signup({handlePage}) {
    const [input,setInput]=useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        userType:"customer",
        password:""
    })
    const [loading,setLoading]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const handleSignup=async(req,res)=>{
        console.log(input)
    }
    return (
      <Flex
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={1}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Create Account
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
                <FormLabel>Name</FormLabel>
                <Input type="text" value={input.name} onChange={(e)=>setInput({...input,name:e.target.value})}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={input.email} onChange={(e)=>setInput({...input,email:e.target.value})}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input type="text" value={input.phone} onChange={(e)=>setInput({...input,phone:e.target.value})}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input type="text" value={input.address} onChange={(e)=>setInput({...input,address:e.target.value})}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>User Type</FormLabel>
                <select style={{width:"100%",padding:"5px",borderRadius:'5px'}} value={input.userType} name="user-type" onChange={(e)=>setInput({...input,userType:e.target.value})}>
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                </select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})} />
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
                  onClick={handleSignup} isLoading={loading}>
                  SignUp
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already have an account? <Link color={'blue.400'}
                  onClick={()=>handlePage("login")}
                  >Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }