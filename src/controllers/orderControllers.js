const orderServices = require('../services/orderServices')

class OrderControllers {
    async newOrder(req, res) {
        const savedOrder = await orderServices.newOrder(req.body)

        res.status(200).send(savedOrder)
    }

    async updateOder(req, res) {
        const updatedOrder = await orderServices.updateOrder(req.params.id, req.body)

        res.status(200).send(updatedOrder)
    }

    async deleteOrder(req, res){
        await orderServices.deleteOrder(req.params.id)

        res.status(200).send('Order has been deleted')
    }

    async getOrder(req, res){
        const orders = await orderServices.getOrder(req.params.userId)

        res.status(200).send(orders)
    }

    async getAllOrders(req, res){
        const allOrders = await orderServices.getAllOrders()

        res.status(200).send(allOrders)
    }

    async incomeStats(req, res){
        const incomeStats = await orderServices.incomeStats()

        res.status(200).send(incomeStats)
    }
}

module.exports = new OrderControllers()