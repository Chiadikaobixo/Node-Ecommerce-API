const userRouter = require('./routers/user')
require('./src/db/mongoose')
const app = require('./app') 

app.use(userRouter)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server is running on port ' + port)
})