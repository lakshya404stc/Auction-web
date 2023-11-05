const express = require("express")
const routes = express()
const auctionControler = require("../controlers/auctionControler")
const formidable = require("express-formidable")
const authMiddlewares = require("../middlewares/authMiddlewares")

routes.post("/create-auction",formidable(),auctionControler.createProductContrler)

routes.post("/getsinglebiddingproducts", authMiddlewares.verifyToken,auctionControler.getsellingproducts)

routes.get("/auction-photo/:pid", auctionControler.productPhotoControler);

routes.post("/getauctionproducts",auctionControler.getallproducts)

routes.get("/deleteauctionproduct/:pid", auctionControler.deleteproductcontroler);

routes.post("/buyauctionproducts",authMiddlewares.verifyToken,auctionControler.buyProductControler)

routes.get("/highestbid/:pid",auctionControler.highestbid)

routes.post("/addbid/:pid",auctionControler.biddingControler)

module.exports = routes