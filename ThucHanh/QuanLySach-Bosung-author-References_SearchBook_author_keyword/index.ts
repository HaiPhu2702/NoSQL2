import express from 'express';
import bodyParser from "body-parser";
import  mongoose from "mongoose";
import bookRoutes from "./src/router/book.router"

const port=8080;

mongoose.connect('mongodb+srv://root:Password@nosql.1fyfr.mongodb.net/Book2?retryWrites=true&w=majority').then(()=>{
    console.log("success")
}).catch((err)=>{throw err})



const app = express();

app.set('view engine', 'ejs');
app.set('views','./src/views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}))

app.use('/book',bookRoutes)


app.listen(port,()=>{
    console.log("http://localhost:"+port)
})