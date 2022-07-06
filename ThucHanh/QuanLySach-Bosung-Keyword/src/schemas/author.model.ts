
import mongoose from "mongoose";



const authorSchema =new mongoose.Schema({
    name: String
})

const Author=mongoose.model('author',authorSchema)

export {Author}
