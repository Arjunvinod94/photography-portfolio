const express = require('express')
const user_route = express()

user_route.set('view engine','ejs')
user_route.set('views','./views/users')

const bodyParser = require('body-parser')
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({extended:true}))

user_route.use(express.static('public'))

const userController = require('../controllers/userController')

user_route.get('/',userController.loadHome)

module.exports = user_route