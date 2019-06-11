// With mongoose we connecting our MongoDb
const mongoose = require('mongoose');
const path = require('path');
const coverImageBasePath = 'upload/bookCovers'; // Path to all our images that we are stored in upload/bookCovers

// Creating Schema in MongoDb or NoSQL libraries, schema is essentially the same thing as a table in the normal SQL database
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createAt: {
    // With Date, our main page of application will show all over recently added pages in order from must recently one, to the least recent one
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    // saving cover as a String in our server
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId // This is Id of author object and this is telling Mongoose that this is another object inside of our collections
  }
});

// Creating a virtual property
bookSchema.virtual('coverImagePath').get(function () {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName);
  }
});

//exporting our Schema to a new model bookSchema
module.exports = mongoose.model("Book", bookSchema);
// exporting our Cover image Base path
module.exports.coverImageBasePath = coverImageBasePath;