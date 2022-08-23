const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const formidable = require('formidable');
const cartModel = require('../models/cart.model');
// const { json } = require('express');
// const bodyParser = require('body-parser');
// app.use(express.urlencoded({extended:true}));
// app.use(bodyParser.json());



router.get('/get-cart', (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files)=>{
        cartModel.find({email:fields.email}, (err, result)=>{
            if (result.length > 0) {
                if (err) {
                   return res.send('error occured, cound not fetch cart');
                }else{
                    console.log(result[0].items);
                    return res.send(result[0].items);

                }
            } else {
                console.log('Invalid request');
                return res.send('Invalid request')
            }
        })
    })
})
router.post('/add-to-cart', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (fields.email != null || fields.email != '') {
            cartModel.find({email:fields.email},(err,result)=>{
                console.log(result);
                if (result.length>0) {
                        
                    let data = result[0];
                    let allItems = data.items;
                    let a;
                    for (let i = 0; i < allItems.length; i++) {
                        const element = allItems[i];
                        if (element.productId==fields.items.productId) {
                            a = true;
                            break;
                        } else {
                            a = false;
                        }
                    }
                    if (a) {
                        console.log("Product is already in cart");
                        res.send("Product is already in cart");
                    } else {
                        let updateCart = [...allItems, fields.items];
                        cartModel.findOneAndUpdate({email:fields.email}, {$set: {email:fields.email, items: updateCart}}, null, (err)=>{
                            if (err) {
                                console.log(err);
                                 res.send(err);
                            } 
                        })
                    }
                } else {
                    let formData = new cartModel({email:fields.email, items: [fields.items]});
                    formData.save((err) => {
                        if (err) {
                            res.send(err);
                        }else {
                            res.send('Product added to cart.');
                        }
                    });
                }
            })
            
        } 
        else{
            console.log('Invalid request');
           return res.send('Invalid request')
        }
    })
    // console.log([email, items]);
    // res.send("<p>I got your request...Processing...</p>");

})

router.patch('/increase-item-count',(req,res)=>{
    console.log(".... made a request")
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files)=>{
        cartModel.find({email:fields.email},(error, result)=>{
            let newCart;
            // res.send(result.length.toString());
            let uid = '';
            if (result.length > 0) {
                let items= result[0].items;
                uid = result[0]._id;
                console.log(uid);
                let editIndex;
                let found;
                for (let i = 0; i < items.length; i++) {
                    const element = items[i];
                    if (element.productId == fields.items.productId) {
                        found = true;
                        editIndex = i;
                        break;
                    } else{
                        found = false;
                    }
                }
                if (found) {
                    
                    let edited = parseInt(items[editIndex].count)+1;
                    items[editIndex].count = edited.toString();
                    // console.log(items);
                    newCart = {"email" : result[0],"items": items};
                    cartModel.findByIdAndUpdate(uid, {"email" : result[0].email,"items": items}, null, (err, result)=>{
                        if (err) {
                            res.send(err.message)
                        }else{
                            console.log(result);
                            res.send("success");

                        }
                    })
                    // console.log(found);
                    // res.send(items); 
                }else {
                    console.log(found);
                    console.log('Invalid request');
                    res.send("Invalid request");
                }
                // res.send(found);
            } else {
                console.log('Invalid request');
                res.send("Invalid request");
            }
        })
    })
})
router.patch('/decrease-item-count',(req,res)=>{
    console.log(".... made a request")
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files)=>{
        cartModel.find({email:fields.email},(error, result)=>{
            let newCart;
            // res.send(result.length.toString());
            let uid = '';
            if (result.length > 0) {
                let items= result[0].items;
                uid = result[0]._id;
                console.log(uid);
                let editIndex;
                let found;
                for (let i = 0; i < items.length; i++) {
                    const element = items[i];
                    if (element.productId == fields.items.productId) {
                        found = true;
                        editIndex = i;
                        break;
                    } else{
                        found = false;
                    }
                }
                if (found) {
                    
                    let edited = parseInt(items[editIndex].count)-1;
                    items[editIndex].count = edited.toString();
                    // console.log(items);
                    newCart = {"email" : result[0],"items": items};
                    cartModel.findByIdAndUpdate(uid, {"email" : result[0].email,"items": items}, null, (err, result)=>{
                        if (err) {
                            res.send(err.message)
                        }else{
                            console.log(result);
                            res.send("success");

                        }
                    })
                }else {
                    console.log(found);
                    console.log('Invalid request');
                    res.send("Invalid request");
                }
                // res.send(found);
            } else {
                console.log('Invalid request');
                res.send("Invalid request");
            }
        })
    })
})

router.delete("/clear-cart", (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        cartModel.find({email: fields.email}, (err, result)=>{
            if (result.length > 0) {
                cartModel.findByIdAndDelete(result[0]._id, null, (err)=>{
                    if (err) {
                        console.log(err.message);
                       return res.send('some error occured...');
                    }else{
                        console.log("success");
                        return res.send("success");
                    }
                })
            } else {
                console.log('Invalid request');
                res.send("Invalid request");
            }
        })
    })
})

router.delete('/delete-item', (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields)=>{
        cartModel.find({email:fields.email}, (err, result)=>{
            if (result.length > 0) {
                let productId = fields.productId;
                let remnant;
                let editIndex;
                let found;
                let items = result[0].items;
                for (let i = 0; i < items.length; i++) {
                    const element = items[i];
                    if (element.productId == productId) {
                        found = true;
                        editIndex = i;
                        break;
                    } else{
                        found = false;
                        
                    }
                }
                if (found) {
                    // let a = [];
                    // a.splice() 
                   remnant = items.splice(editIndex, 1);
                   console.log(remnant);
                   console.log("success");
                   res.send("success")
                } else {
                    console.log('Invalid request');
                    res.send("Invalid request");
                }
            } else {
                console.log('Invalid request');
                res.send("Invalid request");
            }
        })
    })
})

module.exports = router;