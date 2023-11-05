const express = require("express")
const authControlers = require("../controlers/authControler")
const authMiddlewares = require("../middlewares/authMiddlewares")
const routes = express.Router()

//register user || POST
routes.post("/register",authControlers.registerControler)

//login user || post
routes.post("/login",authControlers.loginControler)

routes.post("/forget-password",authControlers.forgotPasswordControler)

routes.get("/user-auth",authMiddlewares.verifyToken, (req,res)=>{
    res.status(200).send({ok:true})
})

module.exports = routes