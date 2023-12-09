const express=require("express")
const app=express()
const cors=require('cors')
const { connectionDB } = require("./db/connection")
const { userRouter } = require("./routes/userRoute")
const { productRouter } = require("./routes/productRoute")
const cookieParser = require("cookie-parser")
const { cartRouter } = require("./routes/cartRoute")
const { orderRouter } = require("./routes/orderRoute")
app.use(cors())
app.use(express.json())
app.use(cookieParser())
require('dotenv').config
const port=process.env.port||8000

app.use("/user",userRouter)
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)
app.listen(port,async()=>{
  try {
    await connectionDB
    console.log("Connected to database")
    console.log(`Server is running at port:${port}`)
  } catch (error) {
    console.log("Error connecting to database")
    console.log(error)
  }
})