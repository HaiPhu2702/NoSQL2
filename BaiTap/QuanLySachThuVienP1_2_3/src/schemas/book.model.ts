import mongoose from "mongoose";

const keywordsSchema =new mongoose.Schema({
    keyword:String
})


const bookSchema =new mongoose.Schema({
    name:String,
    author:String,
    keyword:[keywordsSchema],
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    publisher:{type:mongoose.Schema.Types.ObjectId,ref:"Publisher"}
})

const Book=mongoose.model('Book',bookSchema)

export {Book}