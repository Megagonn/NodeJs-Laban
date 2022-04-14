const express = require('express');
// const fs = require('fs');
// const ejs = require('ejs');
const cors = require('cors');
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const signupModel = require('./models/signup.model');

require('dotenv').config();
const app = express();
const adminRouter = require('./routes/admin.route')
const userRouter = require('./routes/user.route')

///middlewares
app.use(cors());
app.use('/admin', adminRouter);
app.use('/user', userRouter);

/// .env
const port = process.env.port;
const url = process.env.url;
const cloudname = process.env.cloudname;
const apikey = process.env.apikey;
const apisecret = process.env.apisecret;

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

app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
})