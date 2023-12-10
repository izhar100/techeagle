const { OrderModel } = require("../models/orderModel");


const getOrderedItem = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const orders = await OrderModel.find({ customerId }).populate({
          path: 'items.productId',
          select: '-quantity'
      });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in getOrderedItem")
      }
}

const getAllOrders=async(req,res)=>{
    try {
        const orders=await OrderModel.find().populate({
          path: 'items.productId',
          select: '-quantity'
      });
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in getAllOrders")
    }
}
const placeOrder = async (req, res) => {
    try {
        const { userId, items,payment,totalPrice,deliveryAddress } = req.body;
        const order = new OrderModel({ customerId:userId, items,payment,totalPrice,deliveryAddress });
        await order.save();
        res.status(200).json({message:"Order placed"});
      } catch (error) {
        res.status(500).json({ error: error.message });
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
        
        res.status(200).json({message:"Updated Succefully!"});
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