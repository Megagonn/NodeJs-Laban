const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const formidable = require('formidable');
const cartModel = require('../models/cart.model')


router.post('/add-to-cart', (req, res) => {
    // const {email, items} = req.body;
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (fields.email != null || fields.email != '') {
            cartModel.find({email:fields.email},(err,result)=>{
                if (result.length>0) {
                    res.send("Product is already in cart")
                }else{
                    let formData = new cartModel(fields);
                    formData.save((err) => {
                        console.log(err);
                    });
                }
            })
            
        } else{
            console.log('Invalid request');
            res.send('Invalid request')
        }
    })
    // console.log([email, items]);
    // res.send("<p>I got your request...Processing...</p>");

})

router.patch('/increase-item-count',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files)=>{
        // cartModel.findOneAndUpdate({email:fields.email},{},null,(error, result)=>{
        //     if (error) {
        //         console.log(error);
        //         res.send("Error updating the cart.");
        //     }else{
        //     }
        // })
        cartModel.find({email:fields.email},(error, result)=>{
            let newCart;
            let items= result[1]
            let editIndex = items.findIndex((element)=> element.productId == fields.productId
            );
            let edited = parseInt(items[editIndex].count)+1;
            items[editIndex].count = edited;
            newCart = [result[0], items];
            cartModel.updateOne({email:fields.email},{$set: {newCart}}, null, (err, result)=>{
                if (err) throw err;
                console.log('Cart updated');
                res.send('success');
            })
        })
    })
})
router.patch('/decrease-item-count',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files)=>{
        cartModel.find({email:fields.email},(error, result)=>{
            let newCart;
            let items= result[1]
            let editIndex = items.findIndex((element)=> element.productId == fields.productId
            );
            let edited = parseInt(items[editIndex].count)-1;
            items[editIndex].count = edited;
            newCart = [result[0], items];
            cartModel.updateOne({email:fields.email},{$set: {newCart}}, null, (err, result)=>{
                if (err) throw err;
                console.log('Cart updated');
                res.send('success');
            })
        })
    })
})

module.exports = router;