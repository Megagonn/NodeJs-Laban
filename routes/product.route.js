const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');

router.post('/addproduct', (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields)=>{
        if (err) {
            console.log(err);
            res.send('error');
        } else {
            var pictureUrl;
            cloudinary.v2.uploader.upload(fields.picturePath,(err, result)=>{
                if (err) {
                    console.log(err);
                    res.send('error');
                } else{
                    console.log(result);
                    pictureUrl = result.secure_url;
                    let characters = '1234567890abcdefghijklmnopqrstuvwxyz';
                    let id ='';
                    let split = characters.split('');
                    for (let i = 0; i < 30; i++) {
                        if (id.length<=30) {
                            id += split[(Math.random()*35).toFixed()]
                        }
                    }
                    let mongoData = {...fields, productId: id, pictureUrl}
                    let mongoForm = new productModel(mongoData);
                    mongoForm.save((err)=>{
                        if (err) {
                            console.log(err);
                            res.send("error");
                        }else{
                            res.send('success')
                        }
                    })
                }
            })
        }
    })
})

router.get('/products', (req, res)=>{
    productModel.find((err, result)=>{
        if (err) {
            console.log(err);
            res.send('error')
        } else {
            // console.log(result);
            res.send(result)
        }
    })
})

module.exports = router;