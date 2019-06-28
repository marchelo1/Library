// All routes in our index page /index.html
const express = require('express');
const router = express.Router();
const Book = require('../models/book');



//Root of our application
router.get('/', async (req, res) => {
    let books
    try {
        books = await Book.find().sort({
            createdAt: 'desc' // sorting books, desc means that will show us newest book
        }).limit(10).exec()
    } catch {
        books = [] // if goes to error it will show us empty strings
    }
    res.render('index', {
        books: books
    })
});



// Export our router to set up our application
module.exports = router;