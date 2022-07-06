"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_model_1 = require("../schemas/book.model");
const author_model_1 = require("../schemas/author.model");
router.get('/create', async (req, res) => {
    res.render('createBook');
});
router.post('/create', async (req, res) => {
    try {
        const newAuthor = new author_model_1.Author({
            name: req.body.author
        });
        const newBook = new book_model_1.Book({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
        });
        newBook.keywords.push({ keyword: req.body.keyword });
        const book = await newBook.save();
        if (book) {
            res.render('success');
        }
        else {
            res.render('error');
        }
    }
    catch (e) {
        res.render('error');
    }
});
router.get('/update/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.find({ _id: req.params.id });
        console.log(book);
        if (book) {
            res.render('updateBook', { book: book });
        }
        else {
            res.render('error');
        }
    }
    catch (e) {
        res.render('error');
    }
});
router.post('/update', async (req, res) => {
    const bookUpdate = await book_model_1.Book.find({ _id: req.body.id });
    if (bookUpdate) {
    }
    else {
        res.render('error');
    }
});
router.get('/list', async (req, res) => {
    const listBook = await book_model_1.Book.find();
    console.log(listBook);
    res.render('listBook', { books: listBook });
});
router.get('/delete/:id', async (req, res) => {
});
exports.default = router;
//# sourceMappingURL=book.router.js.map