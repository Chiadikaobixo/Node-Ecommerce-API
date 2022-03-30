const orderServices = require('../services/orderServices')
const response = require('../utils/response')

class OrderControllers {
    async newOrder(req, res) {
        const savedOrder = await orderServices.newOrder(req.body)
        res.status(201).send(response('0rder created', savedOrder))
    }

    async updateOder(req, res) {
        const updatedOrder = await orderServices.updateOrder(req.params.orderId, req.body)
        res.status(200).send(response('order updated', updatedOrder))
    }

    async deleteOrder(req, res){
        const deletedOrder = await orderServices.deleteOrder(req.params.orderId)
        res.status(200).send(response('Order has been deleted', deletedOrder))
    }

    async getOrder(req, res){
        const orders = await orderServices.getOrder(req.params.userId)
        res.status(200).send(response('user order', orders))
    }

    async getAllOrders(req, res){
        const allOrders = await orderServices.getAllOrders()
        res.status(200).send(response('all order data',allOrders))
    }

    async incomeStats(req, res){
        const incomeStats = await orderServices.incomeStats()
        res.status(200).send(response('income statistics', incomeStats))
    }
}

module.exports = new OrderControllers()