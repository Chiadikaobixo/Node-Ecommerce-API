const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connection to database successfull')
}).catch((error) => {
 console.log(error)
})
