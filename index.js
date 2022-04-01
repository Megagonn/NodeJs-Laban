const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const formidable = require('formidable');
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const signupModel = require('./models/signup.model');

require('dotenv').config();
const app = express();
const adminRouter = require('./routes/admin.route')

///middlewares
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use('/admin', adminRouter);

/// .env
const port = process.env.port;
const url = process.env.url;


mongoose.connect(url, (err)=>{
    if (err) {
        console.log(err);
        console.log("Mongoose not connected");
    }
    console.log("Mongoose connected");
})



app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
})