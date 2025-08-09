const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const { registerBooks, getOneBook, mybooks, delBook, edit1Book } = require('../controller/bookController');



router.post('/createbook', authorize(["admin","librarian"]) , registerBooks);

router.get('/onebook/:id', getOneBook);

router.get('/', mybooks)

router.delete('/deletebook/:id', authorize(["admin"]), delBook);

router.put('/editbook/:id', authorize(["admin","librarian"]) , edit1Book)






module.exports = router