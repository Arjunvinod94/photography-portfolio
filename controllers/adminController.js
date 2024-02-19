const bcrypt = require('bcrypt')
const path = require('path');
const fs = require('fs')

const Admin = require('../models/adminModel')
const Image = require('../models/imageModel')

const loadLogin = async(req,res)=>{
    try {
        res.render('adminLogin')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password

        const adminData = await Admin.findOne({email: email})
        if(adminData) {
            const passwordMatch = await bcrypt.compare(password, adminData.password)
            if(passwordMatch) {
                req.session.admin_id = adminData._id
                res.redirect('/admin/home')
            }else{
                res.render('adminLogin',{message:"Check your email or password"})
            }

        } else {
            res.render('adminLogin',{message:"Check your email or password"})
        }

    } catch (error) {
        console.log(error.message);
    }
}

const loadHome = async(req,res)=>{
    try {
        const Images = await Image.find({})
        res.render('adminHome',{Images})
    } catch (error) {
        console.log(error.message);
    }
}

const loadLogout = async(req,res)=>{
    try {
        req.session.destroy()
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message);
    }
}

const loadAddImages = async(req,res)=>{
    try {
        res.render('addImages')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyAddImages = async(req,res)=>{
    try {

       var images = new Image({
        image: req.file.filename,
        category: req.body.category
       })

       const imageData = await images.save()
       res.redirect('/admin/home')

    } catch (error) {
        console.log(error.message);
    }
}

const loadEditImage = async(req,res)=>{
    try {
        const imageData = await Image.findById({_id: req.query.id})
        res.render('editImage',{imageData})
    } catch (error) {
        console.log(error.message);
    }
}

const verifyEditImage = async(req,res)=>{
    try {
        const result = await Image.findByIdAndUpdate({_id: req.query.id},{$set:{category: req.body.category}})
        if(result) {
            res.redirect('/admin/home')
        } else {
            res.render('/admin/edit-image',{message: "Unable to edit image"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const deleteImage = async(req,res)=>{
    try {
        const deletedImage = await Image.findByIdAndDelete({_id: req.query.id})
        if(deletedImage) {
            const imageFilename = deletedImage.image
            const imageFolderPath = path.join(__dirname, '../public/img/portfolio')

            const imagePath = path.join(imageFolderPath, imageFilename)
            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            } else {
                console.log(`Image file not found : ${imagePath}`);
            }

            res.redirect('/admin/home')
        } else {
            res.status(404).send('Image not found');
        }


    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    loadHome,
    loadLogout,
    loadAddImages,
    verifyAddImages,
    loadEditImage,
    verifyEditImage,
    deleteImage
}