import mongoose from "mongoose";
declare const Book: mongoose.Model<{
    keyword: {
        keyword?: string;
    }[];
    name?: string;
    author?: string;
    category?: mongoose.Types.ObjectId;
    publisher?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    keyword: {
        keyword?: string;
    }[];
    name?: string;
    author?: string;
    category?: mongoose.Types.ObjectId;
    publisher?: mongoose.Types.ObjectId;
}>>;
export { Book };
