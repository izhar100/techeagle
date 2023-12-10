import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const EditProduct = () => {
    const { token } = useSelector((store) => {
        return {
            token: store.authReducer.token
        }
    }, shallowEqual)
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false)
    const showToast=useShowToast()

    useEffect(() => {
        const getProduct = async (id) => {
            try {
                setLoading(true);
                const res = await fetch(`${api}/product/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getProduct(id);
        console.log(product?.price)
    }, [id]);

    const handleEdit = async () => {
        try {
            setBtnLoading(true);
            const res = await fetch(`${api}/product/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(product),
            });
            const updatedProduct = await res.json();
            console.log('Updated Product:', updatedProduct);
            showToast("Success",updatedProduct.message,"success")
        } catch (error) {
            console.log(error);
            showToast("Error",error.message,"error")
        } finally {
            setBtnLoading(false);
        }
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name == "quantity") {
            value = +value;
        }
        if (name == "price") {
            value = +value
        }
        setProduct({ ...product, [name]: value });
    };

    return (
        <Flex align="center" justify="center" minHeight="100vh">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit();
                }}
                style={{ width: '80%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: "20px", borderRadius: "10px" }}
            >
                <Heading as="h2" mb={4} textAlign="center">
                    Edit Product
                </Heading>

                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={product.name || ''}
                        onChange={handleChange}
                        placeholder="Product Name"
                    />
                </FormControl>

                <FormControl id="image" mt={4} isRequired>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                        type="text"
                        name="image"
                        value={product.image || ''}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                </FormControl>

                <FormControl id="description" mt={4} isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        name="description"
                        value={product.description || ''}
                        onChange={handleChange}
                        placeholder="Product Description"
                    />
                </FormControl>

                <FormControl id="weight" mt={4} isRequired>
                    <FormLabel>Weight</FormLabel>
                    <Input
                        type="text"
                        name="weight"
                        value={product.weight || ''}
                        onChange={handleChange}
                        placeholder="Product Weight"
                    />
                </FormControl>

                <FormControl id="quantity" mt={4} isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <NumberInput min={0} defaultValue={0}>
                        <Input
                            name="quantity"
                            value={product.quantity || ''}
                            onChange={handleChange}
                            placeholder="Product Quantity"
                        />
                    </NumberInput>
                </FormControl>

                <FormControl id="price" mt={4} isRequired>
                    <FormLabel>Price</FormLabel>
                    <NumberInput min={0}>
                        <Input
                            name="price"
                            value={product.price || ''}
                            onChange={handleChange}
                            placeholder="Product Price"
                        />
                    </NumberInput>
                </FormControl>

                <Button colorScheme="blue" variant="solid" type="submit" mt={4} width="100%" isLoading={btnLoading}>
                    Edit Product
                </Button>
            </form>
        </Flex>
    );
};

export default EditProduct;
