const express=require("express")
const { addToCart, getCartItems, updateCartItem } = require("../controllers/cartController")
const { auth } = require("../middleware/auth")
const cartRouter=express.Router()

cartRouter.post("/add",auth,addToCart)
cartRouter.get("/:id",auth,getCartItems)
cartRouter.put("/update/:userId/:productId",auth,updateCartItem)


module.exports={
    cartRouter
}