const userRouter = require('./routers/user')
const authRouter = require('./routers/auth')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')
require('./db/mongoose')
const app = require('./app') 

app.use(userRouter)
app.use(authRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(orderRouter)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server is running on port ' + port)
})