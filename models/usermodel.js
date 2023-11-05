const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true
    },
    sellerid:{
        type:Number,
        required:true
    },
    orderlist:{
        type:Array,
        default:[]
    },
    auctionsellerid:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("users",userModel)