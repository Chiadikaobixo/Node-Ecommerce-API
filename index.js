const userRouter = require('./routers/user')
const authRouter = require('./routers/auth')
const productRouter = require('./routers/product')
require('./src/db/mongoose')
const app = require('./app') 

app.use(userRouter)
app.use(authRouter)
app.use(productRouter)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server is running on port ' + port)
})