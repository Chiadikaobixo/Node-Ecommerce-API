const User = require('../models/User')
const CryptoJS = require('crypto-js')


class UserService {
    async updateUser(userId, data) {
        if (data.password) {
            data.password = CryptoJS.AES.encrypt(data.password, process.env.SECRET_KEY).toString()
        }
        const updatedUser = await User.findByIdAndUpdate({ _id: userId },
            { $set: data },
            { new: true }
        )
        return updatedUser
    }

    async deleteUser(userId) {
        const user = await User.findByIdAndDelete({ _id: userId })

        return user
    }

    async getUser(userId) {
        const user = await User.findById({ _id: userId })
        const { password, ...others } = user._doc

        return { ...others }
    }

    async getAllUsers(userquery) {
        const query = { new: userquery }
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find()

        return users
    }

    async getUsersStat() {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

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
        return data
    }
}

module.exports = new UserService()