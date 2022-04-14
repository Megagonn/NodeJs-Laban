const express = require('express');
// const fs = require('fs');
// const ejs = require('ejs');
const cors = require('cors');
// const formidable = require('formidable');
const cloudinary = require('cloudinary');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const signupModel = require('./models/signup.model');

const app = express();

///middlewares
app.use(cors());
const adminRouter = require('./routes/admin.route')
const userRouter = require('./routes/user.route')
app.use('/admin', adminRouter);
app.use('/user', userRouter);

/// .env
require('dotenv').config();
const PORT = process.env.PORT;
const url = process.env.URL;
const cloudname = process.env.CLOUDNAME;
const apikey = process.env.APIKEY;
const apisecret = process.env.APISECRET;

///cloudinary config
cloudinary.config({ 
    cloud_name: cloudname, 
    api_key: apikey, 
    api_secret: apisecret, 
});

mongoose.connect(url, (err)=>{
    if (err) {
        console.log(err);
        console.log("Mongoose not connected");
    }
    console.log("Mongoose connected");
})

app.get('/', (req, res)=>{
    res.send(__dirname+"./index.html");
})

app.listen(PORT, ()=>{
    console.log(`listening at port ${PORT}`);
})