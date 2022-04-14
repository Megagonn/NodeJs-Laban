const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    password:String,
})
// let saltRound = '10';
// userSchema.pre('save', (next)=>{
//     const document = this;
//     bcrypt.hash(this.password, saltRound, (err, hash)=>{
//         if (!err) {
//             document.password = hash;
//             console.log(hash);
//             next();
//         } else{
//             console.log(err);
//         }
//     })
// })

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;