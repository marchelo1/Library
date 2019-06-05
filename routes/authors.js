const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {} // this will store all object and put it in searchOptions
  if (req.query.name != null && req.query.name !== '') { // query is an optional part of a URL that we get after post request 
    searchOptions.name = new RegExp(req.query.name, 'i') // if we have the name that we will add it to a search options, and add Reagular Expression and 'i' means it case sensitive
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
router.get("/new", (req, res) => {
  res.render("authors/new", {
    author: new Author()
  }); // Create new page for authors, its help us to save, delete, and update things inside of database and give us an object that we can use in ejs file
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name // Get name
  });
  try {
    const newAuthor = await author.save() // this will await to save, then will create newAuthor
    //res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author"
    });
  }
});

module.exports = router;