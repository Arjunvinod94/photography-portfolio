const Image = require('../models/imageModel')

const loadHome = async(req,res)=>{
    try {
        const Images = await Image.find({})
        res.render('home',{Images})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadHome
}