const userService = require('../services/userServices')


class UserControllers {
    async updatedUser(req, res){
        const updatedUser = await userService.updateUser(req.params.id, req.body)
        res.status(200).send(updatedUser)
    }

    async deleteUser(req, res){
        await userService.deleteUser(req.params.id)
        res.status(200).send('user has been deleted')
    }

    async getUser(req, res){
        const user = await userService.getUser(req.params.id)
        res.status(200).send(user)
    }

    async getAllUsers(req, res){
        const allUsers = await userService.getAllUsers()
        res.status(200).send(allUsers)
    }

    async getUsersStat(req, res){
        const usersData = await userService.getUsersStat()
        res.status(200).send(usersData)
    }
}

module.exports = new UserControllers()