const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const signupSchema = mongoose.Schema({
   fname:String, 
   lname:String,
   email:String,
   pword:String,
   phone:String,
})

// let saltRound = 10;
// signupSchema.pre('save', (next)=>{
//     const document = this;
//     bcrypt.hash(this.pword, saltRound, (err, hashedPassword)=>{
//         if(!err){
//             document.pword = hashedPassword;
//             next();
//         } else {
//             console.log(err);
//         }
//     })
// })

const signupModel = mongoose.model('signup_tb', signupSchema);

module.exports = signupModel;