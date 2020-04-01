const express = require('express')
const path = require('path')
require('./db/mongoose')
const userRoute = require('./routes/user_route')
const diaryRoute = require('./routes/sequel_route')


const port = process.env.PORT
const pubdir = path.join(__dirname,'../public')

const app = express()

app.use(express.json())
app.use(express.static(pubdir))
app.use(userRoute)
app.use(diaryRoute)

app.listen(port, () => {
    console.log('Server is up at port : ', port)
})