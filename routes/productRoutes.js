const express = require("express")
const authMiddlewares = require("../middlewares/authMiddlewares")
const productControler = require("../controlers/productControler")
const formidable = require("express-formidable")
const productControlers = require("../controlers/productControler")


const routes = express.Router()

routes.post("/create-product",authMiddlewares.verifyToken,formidable(),productControler.createProductContrler)

routes.post("/getsellingproducts", authMiddlewares.verifyToken,productControler.getsellingproducts)

routes.get("/product-photo/:pid", productControler.productPhotoControler);

routes.post("/getallproducts",productControler.getallproducts)

routes.get("/delete-product/:pid", productControler.deleteproductcontroler);

routes.post("/buyproducts",authMiddlewares.verifyToken,productControler.buyProductControler)

routes.get("/getorders/:pid",productControlers.getProductsInOrderList)

module.exports = routes