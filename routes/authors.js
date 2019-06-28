const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {} // this will store all object and put it in searchOptions
  if (req.query.name != null && req.query.name !== '') { // query is an optional part of a URL that we get after post request 
    searchOptions.name = new RegExp(req.query.name, 'i') // if we have the name that we will add it to a search options, and add Regular Expression and 'i' means it case sensitive
  }
  try {
    const authors = await Author.find(searchOptions) // get all Authors in search options
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query // then send back searchOptions to the users
    })
  } catch {
    res.redirect('/')
  }
});

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', {
    author: new Author()
  }); // Create new page for authors, its help us to save, delete, and update things inside of database and give us an object that we can use in ejs file
});

// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name // Get name
  });
  try {
    const newAuthor = await author.save() // this will await to save, then will create newAuthor
    res.redirect(`authors/${newAuthor.id}`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    });
  }
});

// Geting id from url
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({
      author: author.id
    }).limit(6).exec() // Show only 6 books 
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch {
    res.redirect('/')
  }
});

// Edit id
router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', {
      author: author
    })
  } catch {
    res.redirect('/authors')
  }
});

// Our update route
router.put('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name // after update change the name of author
    await author.save() // this will await to save same Author
    res.redirect(`/authors/${author.id}`)
  } catch {
    if (author == null) {
      res.redirect('/') // If dont find authors, back to the homepage
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  }
});

// Delete author
router.delete('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    await author.remove() // this will delete the Author if server find anyone
    res.redirect('/authors')
  } catch {
    if (author == null) {} else {
      res.redirect(`/authors/${author.id}`)
    }
  };
});



module.exports = router;