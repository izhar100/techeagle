const express=require("express")
const { addProduct, updateProduct, deleteProduct } = require("../controllers/productController")
const productRouter=express.Router()

productRouter.post("/add",addProduct)
productRouter.patch("/update/:id",updateProduct)
productRouter.delete("/delete/:id",deleteProduct)



module.exports={
    productRouter
}