const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const formidable = require('formidable');
const cartModel = require('../models/cart.model')


router.post('/addtocart', (req, res) => {
    // const {email, items} = req.body;
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (fields.email != null || fields.email != '') {
            let formData = new cartModel(fields);
            formData.save((err) => {
                console.log(err);
            });
        } else{
            console.log('Fill all data');
            res.send('Fill all data')
        }
    })
    // console.log([email, items]);
    // res.send("<p>I got your request...Processing...</p>");

})

module.exports = router;