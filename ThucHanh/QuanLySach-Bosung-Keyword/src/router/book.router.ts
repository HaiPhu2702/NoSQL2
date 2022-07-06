
import express from "express";
const router=express.Router()
import {Book} from "../schemas/book.model";
import {Author} from "../schemas/author.model";


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
            author:req.body.author,
        })
        newBook.keywords.push({keyword:req.body.keyword})

        const book=await newBook.save();
        if(book){
            res.render('success')
        }else {
            res.render('error')
        }

    }catch (e) {
        res.render('error',)
    }

})

router.get('/update/:id',async (req, res) => {
try {
    const book=await Book.find({_id:req.params.id})
    console.log(book)
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
const bookUpdate = await Book.find({_id:req.body.id})
    if(bookUpdate){

    }else {
        res.render('error')
    }

})

router.get('/list',async (req, res) => {
const listBook = await Book.find();
  console.log(listBook)
res.render('listBook',{books:listBook})
})

router.get('/delete/:id',async (req, res) => {

})






export default router