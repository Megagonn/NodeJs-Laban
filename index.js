const express = require('express');
const cors = require('cors');
const app = express();
// app.use(cors());
// app.use(cors({
//     origin: "*",
// }))
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-type:application/json");
    next();
});
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');


///middlewares
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