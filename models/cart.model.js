const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    email:String,
    items:Array,
});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;