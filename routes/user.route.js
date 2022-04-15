const express = require('express');
const router = express.Router();
const formidale = require('formidable');
const userModel = require('../models/users.model');



router.post('/signup', (req, res)=>{
    const form = new formidale.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err);
        } else {

        
            var json = JSON.parse(fields);
            if (json) {
                console.log(json);
                userModel.find({email:json.email}, (err,result)=>{
                    if (result.length<=0) {
                        let form = new userModel(json);
                        form.save((err)=>{
                            if (err) {
                                res.send("error");
                            } else{
                                res.send('success');
                            }
                        })
                    }
                })
            } else{
                res.send("error");
            }
        }
    })
})

module.exports = router;