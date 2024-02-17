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

module.exports = {
    loadLogin,
    verifyLogin,
    loadHome,
    loadAddImages,
    verifyAddImages,
}