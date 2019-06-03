//checking if we are producing in our local environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

//express server
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// export our Router from /routes/index.js
const indexRouter = require('./routes/index');


app.set('view engine', 'ejs'); // setting view engine to generate HTML with plain JavaScript, ejs 
app.set('views', __dirname + '/views'); // from directory views
app.set('layout', 'layouts/layout'); // putting all our html file, as header and footer in one file
app.use(expressLayouts); // use layouts
app.use(express.static('public')); // in public folder we put css, js, img etc

//conecting our application with mongodb database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
//checking if we are connecting or not to a database
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// telling the root path to our application, telling what route to handle
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000); // server will listen port 3000