const jwt=require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const e = require("express");
require("dotenv").config()
const protectRoute=async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        //req.headers.authorization.split(' ')[1] || 
        if(!token){
            return res.status(401).json({msg:"Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.secretKey)
        const user=await UserModel.findById(decoded?.userId).select("-password");
        if(user.userType=="manager"){
            next()
        }else{
            return res.status(401).json({msg:"Unauthorized"}) 
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in protectRoute: ",error.message)
    }
}

module.exports={
    protectRoute
}