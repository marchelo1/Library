const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Author = require("../models/author");
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];

// All Book Route
router.get("/", async (req, res) => {
  let query = Book.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i')); // Searching for the book 
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') { // Searching for the book  published before 
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') { // Searching for the book  published after 
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  try {
    const books = await query.exec()
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
});

// New Book Route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});


// Create Book Route
router.post('/', async (req, res) => { //multer tell us that we are upload single filename 'cover'
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  });
  //to save our Cover
  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save() // saving the new book
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`books`)
  } catch {
    renderNewPage(res, book, true)
  }
});


// Show Book Route
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author') // populate means that we will fill informations of author
      .exec()
    res.render('books/show', {
      book: book
    })
  } catch {
    res.redirect('/')
  }
});

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Book';
    res.render("books/new", params)
  } catch {
    res.redirect("/books");
  }
};

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded) // coverEncoded is JSON file parsed into single JSON objec cover
  if (cover != null && imageMimeTypes.includes(cover.type)) { // Check the img type
    book.coverImage = new Buffer.from(cover.data, 'base64') // converting cover img into data 
    book.coverImageType = cover.type // so we can extract our Buffer data into our imge
  }
};

module.exports = router;