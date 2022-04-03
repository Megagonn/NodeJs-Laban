const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name:String,
    price:String,
    category:String,
    discount:String,
    new:String,
    picturePath:String,
    description:String,
    quantity:Number,
})
const productModel = mongoose.model('products', productSchema);

module.exports= productModel;