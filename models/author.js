// With mongoose we connecting our MongoDb
const mongoose = require('mongoose');
const Book = require('./book');

// Creating Schema in MongoDb or NoSQL libraries, schema is essentially the same thing asa a table in the normal SQL database
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

authorSchema.pre('remove', function (next) { // callback function next means that we will skip the error
  Book.find({
    author: this.id
  }, (err, books) => {
    if (err) {
      next(err)
    } else if (books.length > 0) { // if this books are not empty, and has a book, we dont want to delete this author
      next(new Error('This author has books still'))
    } else {
      next() // if there is no err and have no books, next() will tell mongoose to remove the author
    }
  });
});

//exporting our Schema to a new model authorSchema
module.exports = mongoose.model('Author', authorSchema);