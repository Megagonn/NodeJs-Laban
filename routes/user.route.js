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

        
            var json = fields;
            if (json) {
                console.log(json);
                userModel.find({email:json.email}, (err,result)=>{
                    if (result.length<=0) {
                        let formi = new userModel(json);
                        formi.save((err)=>{
                            if (err) {
                                res.send({message:"error"});
                            } else{
                                res.send(result);
                            }
                        })
                    } else if(err){
                        res.send({message:err})
                    } else {
                        res.send({message:"email already exist!"});
                    }
                })
            } else{
                res.send({message:"error"});
            }
        }
    })
})

module.exports = router;