const mongoose=require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    productImage: String,
    productDescription: String,
    weight: Number,
    quantity: Number,
    price: Number,
  });
  
  const productModel = mongoose.model('Product', productSchema);

  module.exports={
    productModel
  }