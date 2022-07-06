import mongoose from "mongoose";

const keywordsSchema =new mongoose.Schema({
    keyword:String
})


const bookSchema =new mongoose.Schema({
    title:String,
    description:String,
    author: String,
    keywords:[keywordsSchema],

})

const Book=mongoose.model('Book',bookSchema)

export {Book}