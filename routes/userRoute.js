const express = require('express');
const { signUp, getOneUser, myusers, login, delUser,  editUser } = require('../controller/userController');
const authorize = require('../middlewares/authorize');


const router = express.Router();

router.post('/', signUp)

router.get('/', myusers)

router.delete('/deluser/:id', authorize(["admin",]) ,delUser)

router.get('/:id', getOneUser)

router.put('/edituser/:id',  authorize(["admin", "self"]) , editUser)

router.post('/login', login)


module.exports = router
