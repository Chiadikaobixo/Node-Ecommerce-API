const express = require('express')
const router = new express.Router()
const authControllers = require('../controllers/authController')


router.post('/users/signup', authControllers.signUp)

router.post('/users/login', authControllers.login)

module.exports = router