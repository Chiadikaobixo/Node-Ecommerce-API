const Order = require('../models/Order')
const CustomError = require('../utils/customError')


class OrderServices {
    async newOrder(data) {
        const newOrder = new Order(data)
        const savedOrder = await newOrder.save()

        return savedOrder
    }

    async updateOrder(orderId, data) {
        const updatedOrder = await Order.findByIdAndUpdate({ _id: orderId },
            { $set: data },
            { new: true }
        )
        if (!updatedOrder) throw new CustomError('Order not found!', 404)

        return updatedOrder
    }

    async deleteOrder(orderId) {
        const deletedOrder = await Order.findByIdAndDelete({ _id: orderId })
        if (!deletedOrder) throw new CustomError('Order not found!', 404)


        return deletedOrder
    }

    async getOrder(userId) {
        const order = await Order.find({ userId: userId })
        if (!order) throw new CustomError('Order not found!', 404)

        return order
    }

    async getAllOrders() {
        const orders = await Order.find()
        if (!orders) throw new CustomError('Orders not found!', 404)

        return orders
    }

    async incomeStats() {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

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

        if (!income) throw new CustomError('income statistics not found!', 404)


        return income
    }
}

module.exports = new OrderServices()