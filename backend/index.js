const express=require("express")
const app=express()
const cors=require('cors')
const { connectionDB } = require("./db/connection")
const { userRouter } = require("./routes/userRoute")
const { productRouter } = require("./routes/productRoute")
app.use(cors())
require('dotenv').config
const port=process.env.port||8000

app.use("/user",userRouter)
app.use("/product",productRouter)
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