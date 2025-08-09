import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String
    }
},{timestamps:true}) //CreatedAt UpdatedAt

const User=mongoose.model("User",userSchema) //Creating user model from schema
export default User // We will use this model outside this component