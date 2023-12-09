const { CartModel } = require("../models/cartModel");


const getCartItems = async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await CartModel.findOne({ userId }).populate({
            path: 'items.productId',
            select: '-quantity'
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in getCartItems")
    }
}
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await CartModel.findOneAndUpdate(
            { userId },
            { $addToSet: { items: { productId, quantity } } },
            { upsert: true, new: true }
        );
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in addToCart")
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;
        const cart = await CartModel.findOneAndUpdate(
            { userId, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in updateCartItem")
    }
}

module.exports = {
    addToCart,
    getCartItems,
    updateCartItem
}