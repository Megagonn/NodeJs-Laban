const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name:String,
    price:String,
    shippingFee:String,
    category:String,
    discount:Boolean,
    // new:Boolean,
    // picture:String,
    pictureUrl:String,
    description:String,
    quantity:Number,
})
const productModel = mongoose.model('products', productSchema);

module.exports= productModel;