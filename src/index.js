const express = require('express')
const path = require('path')
require('./db/mongoose')
const userRoute = require('./routes/user_route')
const diaryRoute = require('./routes/sequel_route')


const port = process.env.PORT || 3000
const pubdir = path.join(__dirname,'../public')

const app = express()

app.use(express.json())
app.use(express.static(pubdir))
app.use(userRoute)
app.use(diaryRoute)

app.listen(port, () => {
    console.log('Server is up at port : ', port)
})

const User = require('./model/user')

const fun = async () => {
    const user = await User.findById('5e83b13bdaf1ab78fc56eb8d')
    await user.populate('sequel').execPopulate()
    console.log(user.sequel)
}
fun()