import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  Heading,
} from '@chakra-ui/react';
import { api } from '../api';
import { shallowEqual, useSelector } from 'react-redux';
import useShowToast from '../hooks/useShowToast';

const AddProduct = () => {
    const {token}=useSelector((store)=>{
        return {
            token:store.authReducer.token
        }
    },shallowEqual)
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    weight: '',
    quantity: '',
    price: '',
  });
  const showToast=useShowToast()
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addProduct=async()=>{
        try {
            setLoading(true)
            const res=await fetch(`${api}/product/add`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify(formData)
            })

            const result=await res.json()
            showToast("Success","Product Added to inventory","success")
            setFormData({
                name: '',
                image: '',
                description: '',
                weight: '',
                quantity: '',
                price: '',
              })
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setLoading(false)
        }
    }
    addProduct()
  };

  return (
    <>
    <Flex align="center" justify="center" minHeight="100vh">
      <form onSubmit={handleSubmit} style={{ width: '80%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',padding:"20px",borderRadius:"10px" }}>
        <Heading as="h2" mb={4} textAlign="center">
          Add Product
        </Heading>

        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
        </FormControl>

        <FormControl id="image" mt={4} isRequired>
          <FormLabel>Image URL</FormLabel>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </FormControl>

        <FormControl id="description" mt={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
          />
        </FormControl>

        <FormControl id="weight" mt={4} isRequired>
          <FormLabel>Weight</FormLabel>
          <Input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Product Weight"
          />
        </FormControl>

        <FormControl id="quantity" mt={4} isRequired>
          <FormLabel>Quantity</FormLabel>
          <NumberInput min={0} defaultValue={0}>
            <NumberInputField
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Product Quantity"
            />
          </NumberInput>
        </FormControl>

        <FormControl id="price" mt={4} isRequired>
          <FormLabel>Price</FormLabel>
          <NumberInput min={0} defaultValue={0}>
            <NumberInputField
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Product Price"
            />
          </NumberInput>
        </FormControl>

        <Button colorScheme="blue" variant="solid" type="submit" mt={4} width="100%" isLoading={loading}>
          Submit
        </Button>
      </form>
    </Flex>
    <br />
    <br />
    </>
  );
};

export default AddProduct;
