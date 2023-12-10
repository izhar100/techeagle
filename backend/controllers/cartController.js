const { CartModel } = require("../models/cartModel");


const getCartItems = async (req, res) => {
    try {
        const userId = req.body.userId;
        const cart = await CartModel.findOne({ userId }).populate({
            path: 'items.productId',
            select: '-quantity'
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in getCartItems")
    }
}
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const existingCartItem = await CartModel.findOne({ userId, 'items.productId': productId });
        if (existingCartItem) {
            res.status(500).json({error:"Product is already in the cart"});
        } else {
            const cart = await CartModel.findOneAndUpdate(
                { userId },
                { $addToSet: { items: { productId, quantity } } },
                { upsert: true, new: true }
            );
            res.status(200).json(cart);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in addToCart")
    }
}

const removeFromCart = async (req, res) => {
    try {
      const id=req.params.id
      const { userId } = req.body;
  
      const cart = await CartModel.findOneAndUpdate(
        { userId },
        { $pull: { items: { _id:id } } },
        { new: true }
      );
      res.status(200).json({message:"Product removed from cart"});
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log('Error in removeFromCart');
    }
  };
  

const updateCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const { quantity } = req.body;
        const cart = await CartModel.findOneAndUpdate(
            { userId, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );
        res.status(200).json({msg:"Quantity Updated Successfully!"});
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in updateCartItem")
    }
}

module.exports = {
    addToCart,
    getCartItems,
    updateCartItem,
    removeFromCart
}