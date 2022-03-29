const Order = require('../models/Order')

class OrderServices {
    async newOrder(data) {
        const newOrder = new Order(data)
        const savedOrder = await newOrder.save()

        return savedOrder
    }

    async updateOrder(userId, data) {
        const updatedOrder = await Order.findByIdAndUpdate({ _id: userId },
            { $set: data },
            { new: true }
        )

        return updatedOrder
    }

    async deleteOrder(userId) {
        const deletedOrder = await Order.findByIdAndDelete({ _id: userId })

        return deletedOrder
    }

    async getOrder(userId) {
        const orders = await Order.find({ userId: userId })

        return orders
    }

    async getAllOrders() {
        const orders = await Order.find()

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

        return income
    }
}

module.exports = new OrderServices()