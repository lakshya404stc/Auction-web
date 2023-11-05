const productModel = require("../models/productmodel")
const slugify = require("slugify")
const fs = require("fs")
const usermodel = require("../models/usermodel")

const productControlers = {
    createProductContrler: async(req,res)=>{
        try {
            const {name,discription,price,quantity,productsellerid} = await req.fields
            const {photo} = await req.files

            if(!name||!discription||!price||!quantity||!productsellerid){
                return res.status(500).send({success:"false",messege:"one of the required field is missing"})
            }

            const product = new productModel({...req.fields,slug:slugify(name)})
            if(photo){
                product.photo.data = fs.readFileSync(photo.path)
                product.photoContentType = photo.type
            }
            await product.save()
            res.status(200).send({success:"true",messege:"product created successfully"})

        } catch (error) {
            console.log(error)
            res.status(500).send({success:"false",messege:"something went wrong"})
        }
    },
    getsellingproducts:async(req,res)=>{
        const {sellerid} = await req.body
        if(!sellerid){
            return res.status(500).send({success:"false",messege:"seller id not found please login again"})
        }

        const allproducts = await productModel.find({productsellerid:sellerid}).select("-photo")
        if(allproducts){
            return res.status(200).send({status:"true",allproducts})
        }
    },
    productPhotoControler:async (req, res) => {
        try {
          const product = await productModel.findById(req.params.pid).select("photo");
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
        const product = await productModel.findByIdAndDelete(req.params.pid)
        if(product){
          res.status(200).send({success:"false",messege:"removed from sale"})
        }
      } catch (error) {
        console.log(error)
      }
    },
    getallproducts:async(req,res)=>{

      const allproducts = await productModel.find({}).select("-photo")
      if(allproducts){
        return res.status(200).send({status:"true",allproducts})
      }
  },
  buyProductControler: async (req, res) => {
    try {
      const { productid, user } = req.body;
      const product = await productModel.findById(productid);
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
      console.log(pid) 
      const user = await usermodel.findById(pid);
      console.log(user)
      const productIdsInOrderList = user.orderlist;
      console.log(2)
      const productsInOrderList = await productModel
        .find({ _id: { $in: productIdsInOrderList } })
        .select("-photo");
        console.log(3)
      if (productsInOrderList.length > 0) {
        return res.status(200).send({ success: "true", products: productsInOrderList });
      } else {
        return res.status(200).send({ success: "true", message: "No products found in the order list" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: "false", message: "Something went wrong" });
    }
  }
  
  
}

module.exports = productControlers