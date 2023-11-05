const mongoose = require("mongoose")

const productModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    productsellerid:{
        type: Number,
        required:true
    }
}) 

module.exports = mongoose.model("products",productModel)