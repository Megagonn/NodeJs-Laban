const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
   fname:String, 
   lname:String,
   email:String,
   pword:String
})

const signupModel = mongoose.model('signup_tb', signupSchema);

module.exports = signupModel;