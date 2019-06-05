// With mongoose we connecting our MongoDb
const mongoose = require('mongoose');

// Creating Schema in MongoDb or NoSQL libraries, schema is essentially the same thing asa a table in the normal SQL database
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

//exporting our Schema to a new model authorSchema
module.exports = mongoose.model('Author', authorSchema)