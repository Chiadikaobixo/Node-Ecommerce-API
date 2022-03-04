const express = require('express')
const User = require('../models/User')
const {verifyTokenAndAuthorization } = require('../src/middleware/verifyToken')
const router = new express.Router()

router.patch('/users/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.user.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router