const express = require('express');
const router = express.Router();
const signupModel = require('../models/signup.model');
const formidable = require('formidable');
const productModel = require('../models/product.model')
const cloudinary = require('cloudinary');

router.post('/signup',(req,res)=>{
    // let {fname, lname, email, pword, phone} = req.body;
    const formi = new formidable.IncomingForm();
    formi.parse(req, (err, fields, files)=>{
        // let {fname, lname, email, pword, phone} = fields;
        signupModel.find({email:fields.email}, (err, result)=>{
            if (err) {
                console.log(err);
            } else {
                if (result.length>0) {
                    res.send("Email already exist!")
                } else {
                    let form = new signupModel(fields);
                    form.save((err)=>{
                        if (err) {
                            console.log(err);
                            res.send("Error Occured!!!")
                        } else {
                            res.send("Sign Up successful")
                        }
                        
                    })
                }
            }
        })
    })
})

router.post('/signin', (req, res)=>{
    // let {useremail, pword} = req.body;
    const formi = new formidable.IncomingForm();
    formi.parse(req, (err, fields, files)=>{
        console.log(fields);
        // let {useremail, pword} = fields;
        signupModel.find({email:fields.useremail}, (err, result)=>{
            if (err) {
                console.log(err);
                res.send('Sign in not successful')
            } else {
                if (result.length < 1) {
                    console.log(result);
                    res.send('Invalid account')
                } else {
                    console.log(result);
                    res.send('valid')
                }
            }
        })

    })

})

// router.get('/dashboard', (req,res)=>{
//     res.send('success')
// })



module.exports = router;