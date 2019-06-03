// all routes in our index page /index.html

const express = require('express');
const router = express.Router();

//root of our application
router.get('/', (req, res) => {
    res.render('index'); // return our index.ejs file
});


// export our router to set up our application
module.exports = router;