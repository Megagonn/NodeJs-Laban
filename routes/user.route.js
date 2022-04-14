const express = require('express');
const router = express.Router();
const formidale = require('formidable');
const userModel = require('../models/users.model');



router.post('/signup', (req, res)=>{
    const form = new formidale.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        if (fields) {
            console.log(fields);
            userModel.find({email:fields.email}, (err,result)=>{
                if (result.length<=0) {
                    let form = new userModel(fields);
                    form.save((err)=>{
                        if (err) {
                            res.send("error");
                        } else{
                            res.send('success');
                        }
                    })
                }
            })
        } 
    })
})

module.exports = router;