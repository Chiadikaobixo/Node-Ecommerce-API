const User = require('../models/User')
const CryptoJS = require('crypto-js')
const CustomError = require('../utils/customError')


class UserService {
    async updateUser(userId, data) {
        if (data.password) {
            data.password = CryptoJS.AES.encrypt(data.password, process.env.SECRET_KEY).toString()
        }
        const updatedUser = await User.findByIdAndUpdate({ _id: userId },
            { $set: data },
            { new: true }
        )
        if (!updatedUser) throw new CustomError('User does not exist!', 404)

        return updatedUser
    }

    async deleteUser(userId) {
        const user = await User.findByIdAndDelete({ _id: userId })

        if (!user) throw new CustomError('No user found!', 404)

        return user
    }

    async getUser(userId) {
        const user = await User.findById({ _id: userId })
        if (!user) throw new CustomError('User not found!', 404)

        const { password, ...others } = user._doc

        return { ...others }
    }

    async getAllUsers(userquery) {
        const query = { new: userquery }
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find()
        if (!users) throw new CustomError('No users found!', 404)

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

        if(!data) throw new CustomError('no data found', 404)
        return data
    }
}

module.exports = new UserService()