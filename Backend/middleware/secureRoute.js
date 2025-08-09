import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const secureRoute = async (req,res,next) =>{
    console.log("=== SECURE ROUTE MIDDLEWARE STARTED ===");
    console.log("Request URL:", req.url);
    console.log("Request method:", req.method);
    console.log("Cookies received:", req.cookies);
    
    try {
        const token= req.cookies.jwt;
        console.log("JWT token exists:", !!token);
        console.log("JWT token length:", token ? token.length : 0);
        
        if(!token){
            console.log("No token found, authorization denied");
            return res.status(401).json({error:"No token,authorization denied"})
        }
        
        console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
        console.log("Verifying token...");
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("Token decoded successfully:", decoded);
        
        if(!decoded){
            console.log("Token verification failed");
            return res.status(401).json({error: "Invalid Token"});
        }
        
        console.log("Finding user by ID:", decoded.userId);
        const user= await User.findById(decoded.userId).select("-password");
        console.log("User found:", !!user);
        
        if(!user){
            console.log("User not found in database");
            return res.status(401).json({error: "No User found"});
        }
        
        req.user=user;
        console.log("User attached to request:", user._id);
        console.log("=== SECURE ROUTE MIDDLEWARE COMPLETED ===");
        next();
    } catch (error) {
        console.log("=== SECURE ROUTE ERROR ===");
        console.log("Error type:", error.name);
        console.log("Error message:", error.message);
        console.log("Full error:", error);
        console.log("Error stack:", error.stack);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export default secureRoute;