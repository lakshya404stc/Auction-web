const authHelper = require("../helpers/authHelper");
const userModel = require("../models/usermodel");
const JWT = require("jsonwebtoken");

const authcontrolers = {
  //register user function
  registerControler: async (req, res) => {
    try {
      const { name, email, password, answer } = req.body;

      function generateUnique6DigitNumber() {
        const uniqueNumber = Date.now() % 1000000; // Get the last 6 digits of the current timestamp
        return uniqueNumber.toString().padStart(6, '0'); // Ensure it's exactly 6 digits long
      }
      const sellerid = await generateUnique6DigitNumber()
      const auctionsellerid = await generateUnique6DigitNumber()
      //validation
      if (!name || !email || !password || !answer || !sellerid || !auctionsellerid) {
        return res.send({
          success: "false",
          messege: "one of the required field is missing",
        });
      }

      //check if user exist
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(200).send({
          success: "false",
          messege: "user already exist please, please login",
        });
      }

      //register user(first hashing the password)
      const hashPassword = await authHelper.hashPassword(password);
      const user = await userModel.create({
        name: name,
        email: email,
        password: hashPassword,
        answer: answer,
        sellerid:sellerid,
        auctionsellerid:auctionsellerid
      });
      return res.status(200).send({
        success: "true",
        messege: "user registered successfully",
        user: { name, email },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: "false",
        messege: "error in registration",
        error,
      });
    }
  },
  loginControler: async (req, res) => {
    const { email, password } = await req.body;
    //validation
    if (!email || !password) {
      return res
        .status(200)
        .send({ success: "false", error: "both email and password required" });
    }

    //check for the user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: "false",
        messege: "user does not exist, please register",
      });
    }

    //checking credentials
    const match = await authHelper.comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: "false",
        messege: "invalid cridentials",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_secret);
    return res.status(200).send({
      success: "true",
      messege: "login successfull",
      user: {
        name: user.name,
        email: user.email,
        sellerid: user.sellerid,
        _id:user._id,
        auctionsellerid: user.auctionsellerid
      },
      token: token,
    });
  },
  forgotPasswordControler: async (req, res) => {
    try {
      const { email, answer, newpassword } = await req.body;

      if (!email || !answer || !newpassword) {
        return res.status(200).send({
          success: "false",
          messege: "one of the required field is missing",
        });
      }

      const user = await userModel.findOne({ email, answer });

      if (!user) {
        return res.status(200).send({
          success: "false",
          messege: "invalid credentials",
        });
      }

      const hashed = await authHelper.hashPassword(newpassword);

      const update = await userModel.findByIdAndUpdate(user._id, {password:hashed})

      if (update) {
        return res.status(200).send({
          success: "true",
          messege: "password updated successfull",
        });
      } else {
        return res.status(200).send({
          success: "false",
          messege: "error udating the password",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = authcontrolers;


