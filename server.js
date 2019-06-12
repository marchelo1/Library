//checking if we are producing in our local environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//express server
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

// export our Router from /routes/index.js
const indexRouter = require("./routes/index");
// export our Router from /routes/authors
const authorRouter = require("./routes/authors");
// export our Router from /routes/books
const bookRouter = require("./routes/books");

app.set("view engine", "ejs"); // setting view engine to generate HTML with plain JavaScript, ejs
app.set("views", __dirname + "/views"); // from directory views
app.set("layout", "layouts/layout"); // putting all our html file, as header and footer in one file
app.use(expressLayouts); // use layouts
app.use(express.static("public")); // in public folder we put css, js, img etc
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: false
  })
); // easy to access to the different input element from server

//conecting our application with mongodb database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});
//checking if we are connecting or not to a database
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// telling the root path to our application, telling what route to handle
app.use("/", indexRouter);
// using authorRouter from authors folder
app.use("/authors", authorRouter);
// using authorRouter from books folder
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000); // server will listen port 3000
