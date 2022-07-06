"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const keywordsSchema = new mongoose_1.default.Schema({
    keyword: String
});
const bookSchema = new mongoose_1.default.Schema({
    name: String,
    author: String,
    keyword: [keywordsSchema],
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    publisher: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Publisher" }
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.Book = Book;
//# sourceMappingURL=book.model.js.map