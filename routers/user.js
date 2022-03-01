const express = require('express')
const router = new express.Router()

router.get('/users', (req, res) => {
    res.send('user test is successfull')
})

router.post('/users', (req, res) => {
    const username = req.body.username
    console.log(username)
    res.send('your user name is' + username )
})

module.exports= router