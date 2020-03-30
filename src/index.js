const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000
const pubdir = path.join(__dirname,'../public')

const app = express()

app.use(express.static(pubdir))

app.listen(port, () => {
    console.log('Server is up at port : ', port)
})