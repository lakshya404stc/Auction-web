const mongoose = require("mongoose")

const auctionmodel = mongoose.Schema({
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
    photo:{
        data:Buffer,
        contentType:String
    },
    productauctionsellerid:{
        type: Number,
        required:true
    },
    bidding:{
        type:Object,
    },
    timerh:{
        type:Number,
    },
    timerm:{
        type:Number,
    },
    timers:{
        type:Number,
    }
}) 

module.exports = mongoose.model("auctionproducts",auctionmodel)