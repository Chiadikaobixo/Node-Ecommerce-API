const userService = require('../services/userServices')
const response = require('../utils/response')


class UserControllers {
    async updatedUser(req, res){
        const updatedUser = await userService.updateUser(req.params.id, req.body)
        res.status(201).send(response('user updated', updatedUser))
    }

    async deleteUser(req, res){
        const deletedUser = await userService.deleteUser(req.params.id)
        res.status(200).send(response('user has been deleted', deletedUser))
    }

    async getUser(req, res){
        const user = await userService.getUser(req.params.id)
        res.status(200).send(response('user data', user))
    }

    async getAllUsers(req, res){
        const allUsers = await userService.getAllUsers()
        res.status(200).send(response('all users', allUsers))
    }

    async getUsersStat(req, res){
        const usersData = await userService.getUsersStat()
        res.status(200).send(response('users data', usersData))
    }
}

module.exports = new UserControllers()