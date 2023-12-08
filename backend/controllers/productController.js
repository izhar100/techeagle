const { ProductModel } = require("../models/productModel");


const getProducts=async(req,res)=>{
    try {
        const products=await ProductModel.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log("Error in getProducts")
    }
}

const getProduct=async(req,res)=>{
    const id=req.params.id
    try {
        const product=await ProductModel.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log("Error in getProduct")
    }
}
const addProduct=async(req,res)=>{
    try {
        const product=new ProductModel(req.body)
        await product.save()
        res.status(201).json({message:"New Product added into the inventory",product})
        
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in addProduct: ", error.message)
    }
}

const updateProduct=async(req,res)=>{
    try {
        const product=await ProductModel.findByIdAndUpdate({_id:req.params.id},req.body,{ new: true })
        res.status(200).json({message:"Product updated successfully",product})
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log("Error in updateProduct: ", error.message)
    }
}

const deleteProduct=async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log("Error in delete: ", error.message)
    }
}

module.exports={
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}