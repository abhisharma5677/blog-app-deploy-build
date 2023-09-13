import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import dotenv from 'dotenv'
import { connectDb } from './helper/db.js';
import path from 'path'


//env config
dotenv.config();


//Import the routes folder
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import { MongoExpiredSessionError } from 'mongodb'


//Calling dbConnect here
connectDb();


const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/user' , userRoute);
app.use('/api/v1/blog' , blogRoute);

//static files
app.use(express.static(path.join(__dirname , './client/build')));

app.get('*' , function(req,res){
    res.sendFile(path.join(__dirname , './client/build/index.html')); 
})


//listen
app.listen(8080 , ()=>{
    console.log("Server started on port 8080");
})
