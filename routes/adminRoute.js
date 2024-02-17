const express = require('express')
const admin_route = express()

const bodyParser = require('body-parser')
admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({extended:true}))

admin_route.set('view engine','ejs')
admin_route.set('views','./views/admin')

const multer = require('multer');
const path = require('path')

admin_route.use(express.static('public'))

const adminController = require('../controllers/adminController')

// Define storage for product images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/portfolio'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});


const upload = multer({storage:storage})

//admin login
admin_route.get('/',adminController.loadLogin)
admin_route.get('/login',adminController.loadLogin)
admin_route.post('/login',adminController.verifyLogin)

//admin home
admin_route.get('/home',adminController.loadHome)

admin_route.get('/add-images',adminController.loadAddImages)
admin_route.post('/add-images',upload.single('image'),adminController.verifyAddImages)

module.exports = admin_route