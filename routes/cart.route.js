const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const formidable = require('formidable');
const cartModel = require('../models/cart.model');
const { json } = require('express');



router.get('/get-cart', (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files)=>{
        cartModel.find({email:fields.email}, (err, result)=>{
            if (err) res.send('error occured, cound not fetch cart');
            console.log(result);
            res.send(result);
        })
    })
})
router.post('/add-to-cart', (req, res) => {
    // const {email, items} = req.body;
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (fields.email != null || fields.email != '') {
            // let decodedField = JSON.parse(fields);
            console.log(JSON.parse(fields));
            cartModel.find({email:fields.email},(err,result)=>{

                let product = result.findIndex((item)=> item)
                if (result.length>0) {
                    res.send("Product is already in cart")
                }else{
                    let formData = new cartModel(fields);
                    formData.save((err) => {
                        console.log(err);
                    });
                    res.send('Product added to cart.')
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