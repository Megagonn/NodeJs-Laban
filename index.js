const express = require('express');
const cors = require('cors');
const app = express();
// const path = require('path');
// app.use(cors());
// app.use(cors({
//     origin: "*",
// }))
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-type:application/json");
    next();
});




///middlewares
const adminRouter = require('./routes/admin.route');
const userRouter = require('./routes/user.route');
const cartRouter = require('./routes/cart.route');
const productRouter = require('./routes/product.route');
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);

/// .env
require('dotenv').config();
const PORT = process.env.PORT;
const url = process.env.URL;
const cloudname = process.env.CLOUDNAME;
const apikey = process.env.APIKEY;
const apisecret = process.env.APISECRET;

///cloudinary config
const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: cloudname, 
    api_key: apikey, 
    api_secret: apisecret, 
});

const mongoose = require('mongoose');
mongoose.connect(url, (err)=>{
    if (err) {
        console.log(err);
        console.log("Mongoose not connected");
    }
    console.log("Mongoose connected");
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})



app.listen(PORT, ()=>{
    console.log(`listening at port ${PORT}`);
})