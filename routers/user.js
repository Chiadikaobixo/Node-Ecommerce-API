const express = require('express')
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../src/middleware/verifyToken')
const router = new express.Router()

router.patch('/users/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
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

router.delete('/users/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('user has been deleted')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc

        res.status(200).send(others)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find()

        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])

        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router