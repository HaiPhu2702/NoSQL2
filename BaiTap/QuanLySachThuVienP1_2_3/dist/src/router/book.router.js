"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_model_1 = require("../schemas/book.model");
const category_model_1 = require("../schemas/category.model");
const publisher_model_1 = require("../schemas/publisher.model");
router.get('/create', async (req, res) => {
    res.render('createBook');
});
router.post('/create', async (req, res) => {
    try {
        const newCategory = new category_model_1.Category({
            name: req.body.category
        });
        const newPublisher = new publisher_model_1.Publisher({
            name: req.body.publisher
        });
        const newBook = new book_model_1.Book({
            name: req.body.name,
            author: req.body.author,
            category: newCategory,
            publisher: newPublisher
        });
        newBook.keyword.push({ keyword: req.body.keyword });
        const C = newCategory.save();
        const P = newPublisher.save();
        const B = newBook.save();
        let [category, publisher, book] = await Promise.all([C, P, B]);
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
router.get('/list', async (req, res) => {
    try {
        const books = await book_model_1.Book.find({})
            .populate("category", "name")
            .populate("publisher", "name");
        res.render("listBook", { books: books });
    }
    catch (_a) {
        res.render("error");
    }
});
router.get('/update/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.params.id })
            .populate("category", "name")
            .populate("publisher", "name");
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
    bookUpdate.name = req.body.name;
    bookUpdate.author = req.body.author;
    const category = await category_model_1.Category.findOne({ _id: bookUpdate.category });
    category.name = req.body.category;
    const publisher = await publisher_model_1.Publisher.findOne({ _id: bookUpdate.publisher });
    publisher.name = req.body.publisher;
    await category.save();
    await publisher.save();
    await bookUpdate.save();
    if (bookUpdate) {
        res.render('success');
    }
    else {
        res.render('error');
    }
});
exports.default = router;
//# sourceMappingURL=book.router.js.map