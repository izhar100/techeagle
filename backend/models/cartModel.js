const mongoose=require("mongoose")

const cartSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    }],
  });

  const CartModel=mongoose.model('Cart',cartSchema)

  module.exports={
    CartModel
  }