const express = require('express');
const mongoose = require('../src/mongoose/mongoose')
const app = express()
const bodyParser = require('body-parser')
const Route = require('../src/router/router')

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded(true))

mongoose.connect_mongoose()

app.use('/',Route)

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Port connected Successfully')
})

