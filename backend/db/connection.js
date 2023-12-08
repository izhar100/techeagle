const mongoose=require('mongoose')
require('dotenv').config()

const connectionDB=mongoose.connect(process.env.mongoURI)

module.exports={
    connectionDB
}