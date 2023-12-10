const jwt=require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
require("dotenv").config()
const auth=async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1] ||  req.cookies.jwt;
        if(!token){
            return res.status(401).json({msg:"Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.secretKey)
        const user=await UserModel.findById(decoded?.userId).select("-password");
        req.body.userId=user._id
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in auth: ",error.message)
    }
}

module.exports={
    auth
}