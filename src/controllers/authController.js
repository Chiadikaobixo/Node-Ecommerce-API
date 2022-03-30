const authService = require('../services/authServices')
const response = require('../utils/response')

class AuthControllers {
    async signUp(req, res){
        const savedUser = await authService.signUp(req.body)
        res.status(201).send(response('user created', savedUser))
    }

    async login(req, res){
        const loggedUser = await authService.login(req.body)
        res.status(200).send(response('user logged-in', loggedUser))
    }
}

module.exports = new AuthControllers()