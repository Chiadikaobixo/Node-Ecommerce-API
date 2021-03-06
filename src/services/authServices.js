const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const User = require('../models/User')
const CustomError = require('../utils/customError')


class AuthServices {
    async signUp(data) {
        const user = new User({
            name: data.name,
            email: data.email,
            password: CryptoJS.AES.encrypt(data.password, process.env.SECRET_KEY).toString()
        })

        if (!user) throw new Error('Error occured')

        const savedUser = await user.save()

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
        )
        
        const {password, ...others} = savedUser._doc
        return {...others, accessToken}
    }


    async login(data){
        const user = await User.findOne({ email: data.email })
        if (!user) throw new CustomError('Incorrect username or password!')
        

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const initialPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if (initialPassword !== data.password) throw new CustomError('Incorrect username or password!')
        

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "2d"}
        )

        const {password, ...others} = user._doc

        return {...others, accessToken}
    }
    
}

module.exports = new AuthServices()