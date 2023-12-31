const express=require('express')
const errorMiddleware=require('./middleware/error')
const cookieParser=require('cookie-parser');
const bodyParser =require("body-parser");
const fileUpload=require("express-fileupload")
const dotenv=require('dotenv')
const app=express();
const path= require("path");
const { fileURLToPath } = require('url');
//   config
dotenv.config({path:'backend/config/config.env'});
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended:true}));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }));
// app.use(
//     fileUpload({
//       limits: { fileSize: 10 * 1024 * 1024 }, // Set the limit to 10MB
//     })
//   );

// routes import

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
    })
const product=require('./routes/productRoute')
const user =require('./routes/userRoute')
const order =require('./routes/orderRoute')
const payment =require('./routes/paymentRoute')

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);

// middleware for error
app.use(errorMiddleware);
module.exports=app;  




