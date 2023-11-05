const JWT = require("jsonwebtoken")
const userModel = require("../models/usermodel")


const authMiddlewares = {
    verifyToken: async(req,res,next)=>{
    try {
        const decode = await JWT.verify(req.headers.authorization,process.env.JWT_secret)
        req.user = decode
        if (req.user) {
            next()
        }
    } catch (error) {
        console.log(error)
    }},
}

module.exports = authMiddlewares