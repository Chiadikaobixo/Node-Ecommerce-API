const express = require('express')
const router = new express.Router()
const Order = require('../models/Order')
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken')

//CREATE
router.post('/orders', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).send(savedOrder)
    } catch (error) {
        res.status(500).send(error)
    }
})

//UPDATE
router.patch('/orders/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).send(updatedOrder)
    } catch (error) {
        res.status(500).send(error)
    }
})

//DELETE
router.delete('/orders/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).send('Order has been deleted')
    } catch (e) {
        res.status(500).send()
    }
})

//GET USER ORDER
router.get('/orders/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })

        res.status(200).send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

//GET ALL ORDERS
router.get('/orders', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error)
    }
})

//MONTHLY INCOME STATS
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount'
          }
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' }
          }
        }
      ])
      res.status(200).send(income);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

module.exports = router