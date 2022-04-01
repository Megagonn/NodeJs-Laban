const express = require('express');
const router = express.Router();
const signupModel = require('../models/signup.model');

router.post('/signup',(req,res)=>{
    let {fname, lname, useremail, pword} = req.body;
    signupModel.find({email:useremail}, (err, result)=>{
        if (err) {
            console.log(err);
        } else {
            if (result.length>0) {
                res.send("Email already exist!")
            } else {
                let form = new signupModel(req.body);
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

router.post('/signin', (req, res)=>{
    let {useremail, pword} = req.body;
    signupModel.find({email:useremail}, (err, result)=>{
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


module.exports = router;