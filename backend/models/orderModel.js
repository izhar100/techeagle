const mongoose=require("mongoose")
const orderSchema = mongoose.Schema({
    customerId: {
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
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
  });
  
  const OrderModel = mongoose.model('Order', orderSchema);

  module.exports={
    OrderModel
  }
  