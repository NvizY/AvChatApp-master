import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup= async (req,res)=>{
    console.log("=== SIGNUP STARTED ===");
    console.log("Request body:", req.body);
    
    const {fullname,email,password,confirmPassword} = req.body;
    
    console.log("Extracted fields:", {fullname, email, password: "***", confirmPassword: "***"});
    
   try {
     console.log("Checking if passwords match...");
     if(password!=confirmPassword){
        console.log("Passwords don't match");
        return res.status(400).json({error:"Password do not match"}) // Status 400 is for invalid data
    }
    
    console.log("Checking if user already exists...");
    const user = await User.findOne({email})
    console.log("Existing user found:", !!user);
    
    if(user){
        console.log("User already exists");
        return res.status(400).json({error:"User already registered"});
    }
    
    console.log("Hashing password...");
    //Hashing the password
    const hashPassword = await bcrypt.hash(password,10)
    console.log("Password hashed successfully");
    
    console.log("Creating new user...");
    const newUser = await new User({
        fullname,
        email,
        password: hashPassword,
    })
    
    console.log("Saving user to database...");
    await newUser.save(); // Save new user in database
    console.log("User saved successfully:", newUser._id);
    
    if(newUser){
        console.log("Creating token and cookie...");
        createTokenAndSaveCookie(newUser._id,res)
        console.log("Token created, sending response...");
        res.status(201).json({message:"User created successfully",user:{
            _id:newUser.id,
            fullname:newUser.fullname,
            email:newUser.email,
        },
        })// 201 is for success
        console.log("=== SIGNUP COMPLETED SUCCESSFULLY ===");
    }
   } catch (error) {
    console.log("=== SIGNUP ERROR ===");
    console.log("Error type:", error.name);
    console.log("Error message:", error.message);
    console.log("Full error:", error);
    console.log("Error stack:", error.stack);
    res.status(500).json({error:"Something went wrong"})// For internal server error
   }
}

//We are using export for signup coz we will create route for it.


export const login= async (req,res) =>{
    console.log("=== LOGIN STARTED ===");
    console.log("Request body:", req.body);
    
    const {email,password} = req.body;
    console.log("Extracted fields:", {email, password: "***"});
    
    try {
        console.log("Finding user by email...");
        const user=await User.findOne({email});
        console.log("User found:", !!user);
        
        if(!user){
            console.log("User not found");
            return res.status(400).json({error:"Invalid User Credentials"})
        }
        
        console.log("Comparing passwords...");
        const isMatch=await bcrypt.compare(password,user.password);
        console.log("Password match:", isMatch);
        
        if(!isMatch){
            console.log("Password doesn't match");
            return res.status(400).json({error:"Invalid User Credentials"})
        }
        
        console.log("Creating token and cookie...");
        createTokenAndSaveCookie(user._id,res);
        console.log("Token created, sending response...");
        
        res.status(200).json({message:"User logged in successfully",user:{
            _id:user.id,
            fullname:user.fullname,
            email:user.email
        }});
        console.log("=== LOGIN COMPLETED SUCCESSFULLY ===");
    } catch (error) {
        console.log("=== LOGIN ERROR ===");
        console.log("Error type:", error.name);
        console.log("Error message:", error.message);
        console.log("Full error:", error);
        console.log("Error stack:", error.stack);
        res.status(500).json({error:"Internal Server Error"})
    }
}
export const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(201).json({message:"User logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const allUsers = async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        const filteredUsers= await User.find({_id:{$ne: loggedInUser}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch(error){
        console.log("Error in allUsers Controller: "+error);
        res.status(500).json({error:"Internal Server Error"});
    }
};