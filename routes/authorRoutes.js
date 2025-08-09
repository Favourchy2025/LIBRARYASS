const express = require('express');
const authorize = require('../middlewares/authorize');
const { createauthor, myauthors, getOneAuthor, delAuthor, edit1Author } = require('../controller/authorController');
const router = express.Router();




router.post('/createauthor', authorize(["admin","librarian"]) , createauthor)

router.get('/authors', myauthors)

router.get('/oneauthor/:id', getOneAuthor)

router.delete('/delAuthor/:id', delAuthor)

router.put('/editauthor/:id', edit1Author)




module.exports = router
