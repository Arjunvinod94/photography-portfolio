const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/PhotographyPortfolio')

const express = require('express')
const app = express()

const nocache = require('nocache');
app.use(nocache());

const userRoute = require('./routes/userRoute')
app.use('/',userRoute)

const adminRoute = require('./routes/adminRoute')
app.use('/admin',adminRoute)

app.listen(3001,()=>{
    console.log('Server Started');
})