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

///middlewares
app.use(cors());
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.json({extended:true}));
app.use('/admin', adminRouter);

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

// app.post('/dash', (req,res)=>{
//     const formi = new formidable.IncomingForm();
//     try {
//         formi.parse(req, (err, fields, files)=>{
//             console.log('i got here');
//             if (!err) {
//                 console.log(fields);
//                 console.log(files);
//                 res.send('success')
//             } else {
//                 console.log(err);
//                 res.send('formi error')
//             }
//         })
//         // console.log(fields);
        
//     } catch (error) {
//         console.log(error);
//         res.send('catch error')
//     }
// })

// app.post('/a', (req,res)=>{
//     const form = new formidable.IncomingForm();
//     form.parse(req, (err, fields, files)=>{
//         console.log(fields);
//         console.log(files);
//         if (err) {
//             console.log(err);
//             // res.send('error');
//         } else {
//             let picturePath = files.picture.filepath;
//             let imgName = files.picture.originalFilename;
//             let mongoData = {...fields, picturePath}
//             console.log(mongoData);
//             let mongoForm = new productModel(mongoData);
//             mongoForm.save((err)=>{
//                 if (err) {
//                     console.log(err);
//                     // res.send("error");
//                 }else{
//                     // res.send("success");

//                 }
//             })
//             cloudinary.v2.uploader.upload(picturePath,(err, result)=>{
//                 if (err) {
//                     console.log(err);
//                     // res.send('error')
//                 } else{
//                     console.log(result);
//                     // res.send('success');
//                 }
//             })
//         }
//     })
// })


app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
})