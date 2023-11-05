const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const authRoutes = require("./routes/authRoutes")
const cors = require("cors")
const productRoutes = require("./routes/productRoutes")
// const {Server} = require("socket.io")
const http = require("http")
const auctionRoutes = require("./routes/auctionRoutes")
const productmodel = require("./models/productmodel")
const mongoose = require('mongoose')
const websocket = require('ws')
const server = http.createServer(app)

const wss = new websocket.Server({server})

app.use(cors());

mongoose.connect(process.env.databaseUrl)
    console.log(`successfully connected to database`)

const db = mongoose.connection

db.on('error',console.error.bind(console,'mongodb connection error'))
db.once('open',()=>{
  console.log("connected to the mongoDb")

  const changeStream = mongoose.connection.collection('products').watch()

  changeStream.on('change',(change)=>{
    wss.clients.forEach((client)=>{
      if(client.readyState === websocket.OPEN){
        client.send(JSON.stringify(change))
      }
    })
  })
})


//db connection

//middlewares
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/auction",auctionRoutes)


// server listen 
server.listen(process.env.PORT,()=>{
    console.log(`listening at port :${process.env.PORT}`)
})

