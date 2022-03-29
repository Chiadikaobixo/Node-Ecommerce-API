const authService = require('../services/authServices')

class AuthControllers {
    async signUp(req, res){
        const savedUser = await authService.signUp(req.body)
        res.status(200).send(savedUser)
    }

    async login(req, res){
        const loggedUser = await authService.login(req.body)
        res.status(200).send(loggedUser)
    }
}

module.exports = new AuthControllers()