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
            author: newAuthor,
        });
        newBook.keywords.push({ keyword: req.body.keyword });
        const author = newAuthor.save();
        const book = newBook.save();
        let [au, bo] = await Promise.all([author, book]);
        if (bo) {
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
router.get('/list', async (req, res) => {
    try {
        let keywordFind = req.query.keyword || "";
        let query = {
            "keywords.keyword": { $regex: keywordFind }
        };
        const books = await book_model_1.Book.find(query).populate({
            path: "author", select: "name"
        });
        res.render("listBook", { books: books });
    }
    catch (_a) {
        res.render("error");
    }
});
router.get('/update/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.params.id }).populate({
            path: "author", select: "name"
        });
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
    const bookUpdate = await book_model_1.Book.findOne({ _id: req.body.id });
    bookUpdate.title = req.body.title;
    bookUpdate.description = req.body.description;
    const author = await author_model_1.Author.findOne({ _id: bookUpdate.author });
    author.name = req.body.author;
    await author.save();
    await bookUpdate.save();
    if (bookUpdate) {
        res.render('success');
    }
    else {
        res.render('error');
    }
});
router.get('/delete/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.params.id });
        const author = await author_model_1.Author.findOne({ _id: book.author });
        await author.remove();
        if (book) {
            await book.remove();
            res.status(200).json({ message: "success" });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
exports.default = router;
//# sourceMappingURL=book.router.js.map