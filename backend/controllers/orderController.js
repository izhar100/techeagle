const { OrderModel } = require("../models/orderModel");


const getOrderedItem = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const orders = await OrderModel.find({ customerId });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in getOrderedItem")
      }
}

const getAllOrders=async(req,res)=>{
    try {
        const orders=await OrderModel.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in getAllOrders")
    }
}
const placeOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;
        const order = new OrderModel({ customerId:userId, items });
        await order.save();
        res.status(200).json({message:"Order placed",order});
      } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in placeOrder")
      }
}

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;
    
        const order = await OrderModel.findByIdAndUpdate(
          orderId,
          { $set: { status } },
          { new: true }
        );
        
        res.status(200).json({message:"Updated Succefully!",order});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports = {
    placeOrder,
    getOrderedItem,
    updateOrderStatus,
    getAllOrders
}