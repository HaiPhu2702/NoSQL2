import mongoose from "mongoose";
declare const Book: mongoose.Model<{
    keywords: {
        keyword?: string;
    }[];
    title?: string;
    description?: string;
    author?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    keywords: {
        keyword?: string;
    }[];
    title?: string;
    description?: string;
    author?: mongoose.Types.ObjectId;
}>>;
export { Book };
