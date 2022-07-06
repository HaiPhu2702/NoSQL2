
import express from "express";
const router=express.Router()
import {Book} from "../schemas/book.model";
import {Author} from "../schemas/author.model";
import * as path from "path";


router.get('/create',async (req, res) => {
    res.render('createBook')
})

router.post('/create',async (req, res) => {
    try {
        const newAuthor=new Author({
            name: req.body.author
        })

        const newBook=  new Book({
            title: req.body.title,
            description: req.body.description,
            author:newAuthor,
        })
        newBook.keywords.push({keyword:req.body.keyword})


        const author=  newAuthor.save();
        const book= newBook.save();

        let [au,bo]=await Promise.all([author,book])


        if(bo){
            res.render('success')
        }else {
            res.render('error')
        }

    }catch (e) {
        res.render('error',)
    }

})

router.get('/list',async (req, res) => {
    try {


         let keywordFind = req.query.keyword || "";
         let query={
         "keywords.keyword": { $regex: keywordFind }
              }

        const books = await Book.find(query).populate({
            path: "author", select: "name"
        }); // dùng populate để join auhtor từ bên collection author, sang bên books, chỉ lấy trường name
        res.render("listBook", {books: books});
    } catch {
        res.render("error");
    }
})



router.get('/update/:id',async (req, res) => {
try {
    const book=await Book.findOne({_id:req.params.id}).populate({
        path:"author",select:"name"
    })

    if(book){
        res.render('updateBook',{book:book})
    }else {
        res.render('error')
    }
}catch (e) {
    res.render('error')
}

})

router.post('/update',async (req, res) => {
const bookUpdate = await Book.findOne({_id:req.body.id});
bookUpdate.title = req.body.title;
bookUpdate.description=req.body.description;

//cap nhat collection Author
    const author = await Author.findOne({_id:bookUpdate.author})
    author.name = req.body.author

    await author.save();
    await bookUpdate.save();

    if(bookUpdate){
res.render('success')
    }else {
        res.render('error')
    }

})


router.get('/delete/:id',async (req, res) => {
    try {
        const book = await Book.findOne({_id: req.params.id});

        const author=await Author.findOne({_id:book.author})
        await author.remove()


        if (book) {
            await book.remove();
            res.status(200).json({message: "success"});
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }

})






export default router