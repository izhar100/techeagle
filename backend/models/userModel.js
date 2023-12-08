const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    phone: String,
    name: String,
    address: String,
    password: String,
    userType: { type: String, enum: ['Customer', 'Manager'] },
});

const UserModel=mongoose.model("User",userSchema)

module.exports={
    UserModel
}