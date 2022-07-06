import express from "express";

const router = express.Router()
import {Book} from "../schemas/book.model";
import {Category} from "../schemas/category.model";
import {Publisher} from "../schemas/publisher.model";

router.get('/create', async (req, res) => {
    res.render('createBook')
})

router.post('/create', async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.category
        })

        const newPublisher = new Publisher({
            name: req.body.publisher
        })

        const newBook = new Book({
            name: req.body.name,
            author: req.body.author,
            category: newCategory,
            publisher: newPublisher

        })
        newBook.keyword.push({keyword: req.body.keyword})

        const C = newCategory.save();
        const P = newPublisher.save();
        const B = newBook.save();

        let [category, publisher, book] = await Promise.all([C, P, B])

        if (book) {
            res.render('success')
        } else {
            res.render('error')
        }

    } catch (e) {
        res.render('error',)
    }

})

router.get('/list', async (req, res) => {
    try {


        // let keywordFind = req.query.keyword || "";
        // let query = {
        //     "keywords.keyword": {$regex: keywordFind}
        // }

        const books = await Book.find({})
            .populate("category", "name")
            .populate("publisher", "name")

        res.render("listBook", {books: books});
    } catch {
        res.render("error");
    }
})


router.get('/update/:id', async (req, res) => {
    try {
        const book = await Book.findOne({_id: req.params.id})
            .populate("category", "name")
            .populate("publisher", "name")

        if (book) {
            res.render('updateBook', {book: book})
        } else {
            res.render('error')
        }
    } catch (e) {
        res.render('error')
    }

})

router.post('/update', async (req, res) => {

    //cap nhat collection Book

    const bookUpdate = await Book.findOne({_id: req.body.id});
    bookUpdate.name = req.body.name;
    bookUpdate.author = req.body.author;

   //cap nhat collection Category
    const category = await Category.findOne({_id: bookUpdate.category})
    category.name = req.body.category

   //cap nhat collection Publisher
    const publisher = await Publisher.findOne({_id: bookUpdate.publisher})
    publisher.name = req.body.publisher


    await category.save();
    await publisher.save();
    await bookUpdate.save();

    if (bookUpdate) {
        res.render('success')
    } else {
        res.render('error')
    }

})


// router.get('/delete/:id',async (req, res) => {
//     try {
//         const book = await Book.findOne({_id: req.params.id});
//
//         const author=await Author.findOne({_id:book.author})
//         await author.remove()
//
//
//         if (book) {
//             await book.remove();
//             res.status(200).json({message: "success"});
//         } else {
//             res.render("error");
//         }
//     } catch (err) {
//         res.render("error");
//     }
//
// })


export default router