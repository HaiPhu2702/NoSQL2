import mongoose from "mongoose";


const publisherSchema = new mongoose.Schema({
    name:String
})

const Publisher = mongoose.model('Publisher',publisherSchema);

export {Publisher}