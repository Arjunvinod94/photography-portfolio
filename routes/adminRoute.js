const express = require('express')
const admin_route = express()

//for session
const session = require('express-session')
const config = require('../config/config')
admin_route.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
}))
const auth = require('../middleware/auth')

admin_route.set('view engine','ejs')
admin_route.set('views','./views/admin')

const bodyParser = require('body-parser')
admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({extended:true}))

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
admin_route.get('/',auth.isLogout,adminController.loadLogin)
admin_route.get('/login',auth.isLogout,adminController.loadLogin)
admin_route.post('/login',adminController.verifyLogin)

//admin home
admin_route.get('/home',auth.isLogin,adminController.loadHome)

admin_route.get('/logout',auth.isLogin,adminController.loadLogout)

admin_route.get('/add-images',auth.isLogin,adminController.loadAddImages)
admin_route.post('/add-images',upload.single('image'),adminController.verifyAddImages)

admin_route.get('/home/edit-image',auth.isLogin,adminController.loadEditImage)
admin_route.post('/home/edit-image',adminController.verifyEditImage)
admin_route.get('/home/delete-image',auth.isLogin,adminController.deleteImage)

module.exports = admin_route