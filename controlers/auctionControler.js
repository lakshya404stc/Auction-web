const auctionmodel = require("../models/auctionmodel")
const slugify = require("slugify")
const fs = require("fs")
const usermodel = require("../models/usermodel")

const auctionControler = {
    createProductContrler: async(req,res)=>{
        try {
            const {name,discription,productauctionsellerid,timerh,timerm,timers} = await req.fields
            const {photo} = await req.files
            console.log(1)
            if(!name||!discription||!productauctionsellerid){
                return res.status(500).send({success:"false",messege:"one of the required field is missing"})
            }

            const product = new auctionmodel({...req.fields,slug:slugify(name)})
            if(photo){
                product.photo.data = fs.readFileSync(photo.path)
                product.photoContentType = photo.type
            }
            await product.save()
            res.status(200).send({success:"true",messege:"product created for auction successfully"})

        } catch (error) {
            console.log(error)
            res.status(500).send({success:"false",messege:"something went wrong"})
        }
    },
    getsellingproducts:async(req,res)=>{
        const {auctionsellerid} = await req.body
        if(!auctionsellerid){
            return res.status(500).send({success:"false",messege:"auction seller id not found please login again"})
        }

        const allproducts = await auctionmodel.find({productauctionsellerid:auctionsellerid}).select("-photo")
        if(allproducts){
            return res.status(200).send({status:"true",allproducts})
        }
    },
    productPhotoControler:async (req, res) => {
        try {
          const product = await auctionmodel.findById(req.params.pid).select("photo");
          if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
          }
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: "false",
            message: "Erorr while getting photo",
            error,
          });
        }
      },
    deleteproductcontroler: async(req,res) =>{
      try {
        const product = await auctionmodel.findByIdAndDelete(req.params.pid)
        if(product){
          res.status(200).send({success:"false",messege:"removed from sale"})
        }
      } catch (error) {
        console.log(error)
        
      }
    },
    getallproducts:async(req,res)=>{

      const allproducts = await auctionmodel.find({}).select("-photo")
      if(allproducts){
          return res.status(200).send({status:"true",allproducts})
      }
  },
  buyProductControler: async (req, res) => {
    try {
      const { productid, user } = req.body;
      const product = await auctionmodel.findById(productid);
      const user1 = await usermodel.findById(user._id);


      if (!product || product.quantity <= 0) {
        return res.status(400).send({ success: "false", message: "Product not available" });
      }

      if (!user1) {
        return res.status(400).send({ success: "false", message: "User not found" });
      }
      user1.orderlist.push(productid);
      product.quantity--;

      await product.save();
      await user1.save();
      res.status(200).send({ success: "true", message: "Product purchased successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: "false", message: "Something went wrong" });
    }
  },
  getProductsInOrderList: async (req, res) => {
    try {
      const { pid } = req.params;

      const user = await usermodel.findById(pid);

      const productIdsInOrderList = user.orderlist;

      const productsInOrderList = await auctionmodel
        .find({ _id: { $in: productIdsInOrderList } })
        .select("-photo");

      if (productsInOrderList.length > 0) {
        return res.status(200).send({ success: "true", products: productsInOrderList });
      } else {
        return res.status(200).send({ success: "true", message: "No products found in the order list" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: "false", message: "Something went wrong" });
    }
  },
  biddingControler: async (req, res) => {
    const { id, biddingprice } = req.body;
    if(!id || !biddingprice){
      return res.status(500).send({success:"false"})
    }
    const {pid} = req.params;
    if(!pid){
      return res.status(500).send({success:"false"})
    }

    try {
      const product = await auctionmodel.findById(pid);

      if (product) {
        product.bidding = {
          ...product.bidding,
          [id]: biddingprice,
        };

  
      await product.save();

        res.status(200).json({ message: 'Bidding updated successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating bidding', error: error.message });
    }
  },
  highestbid: async (req, res) => {
    const { pid } = req.params;
    if(!pid){
      return res.status(500).send({success:"false"})
    }
    try {
      const product = await auctionmodel.findById(pid);
  
      if (!product.bidding) {

        return res.status(200).send({success:"false"});
      }
  
      else{const biddingValues = Object.values(product.bidding);
      const biddingKeys = Object.keys(product.bidding);
  
      const numericBiddingValues = biddingValues.map(Number);
  
      const highestBid = Math.max(...numericBiddingValues);
  
      const highestBidIndex = numericBiddingValues.indexOf(highestBid);
      const sellerIdWithHighestBid = biddingKeys[highestBidIndex];
  
      const highestbidder = await usermodel.findOne({ sellerid: sellerIdWithHighestBid });
  
      return res.send({ highestBid, name: highestbidder.name });}
    } catch (error) {
      // Handle any other errors that may occur during the process.
      console.error(error);
      res.status(500).send({ error: "An error occurred while retrieving the highest bid" });
    }
  }
}

module.exports = auctionControler