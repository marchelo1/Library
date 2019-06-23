// With mongoose we connecting our MongoDb
const mongoose = require('mongoose');

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
  // With Date, our main page of application will show all over recently added pages in order from must recently one, to the least recent one
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  // saving cover as a Data in our server
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  // This is Id of author object and this is telling Mongoose that this is another object inside of our collections
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
});

// Converting our database coverImage Buffer and the Type coverImageType into image object 
bookSchema.virtual('coverImagePath').get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}` // return the source of our image object
  }
});

//exporting our Schema to a new model bookSchema
module.exports = mongoose.model('Book', bookSchema);