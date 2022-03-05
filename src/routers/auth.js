const express = require('express')
const User = require('../models/User')
const router = new express.Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


router.post('/users/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    })

    try {
        const savedUser = await user.save()
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "2d"}
        )

        const {password, ...others} = savedUser._doc
        
        res.status(200).send({...others,  accessToken })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(401).json('Unable to login')
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const initialPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if (initialPassword !== req.body.password) {
            res.status(401).json('Unable to login')
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "2d"}
        )

        const { password, ...others } = user._doc

        res.status(200).send({...others, accessToken })
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router