import mongoose from "mongoose";
declare const Book: mongoose.Model<{
    keywords: {
        keyword?: string;
    }[];
    title?: string;
    description?: string;
    author?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    keywords: {
        keyword?: string;
    }[];
    title?: string;
    description?: string;
    author?: string;
}>>;
export { Book };
