const express=require("express")
const { addToCart, getCartItems, updateCartItem } = require("../controllers/cartController")
const { auth } = require("../middleware/auth")
const { placeOrder, getOrderedItem, updateOrderStatus, getAllOrders } = require("../controllers/orderController")
const { protectRoute } = require("../middleware/protectRoute")
const orderRouter=express.Router()

orderRouter.post("/place",auth,placeOrder)
orderRouter.get("/customer/:customerId",auth,getOrderedItem)
orderRouter.patch("/update/:orderId",protectRoute,updateOrderStatus)
orderRouter.get("/",protectRoute,getAllOrders)


module.exports={
    orderRouter
}