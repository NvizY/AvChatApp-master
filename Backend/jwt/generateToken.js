import jwt from "jsonwebtoken"

const createTokenAndSaveCookie=(userId,res)=>{
    console.log("=== TOKEN GENERATION STARTED ===");
    console.log("User ID:", userId);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    console.log("JWT_SECRET length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
    
    try {
        const token=jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:"10d"
        });
        console.log("Token generated successfully");
        console.log("Token length:", token.length);
        
        const isProduction = process.env.NODE_ENV === "production";
        console.log("Is production:", isProduction);
        
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax", // Changed from "strict" to "none" for cross-origin
            path: "/",
            maxAge: 10 * 24 * 60 * 60 * 1000,
        };
        console.log("Cookie options:", cookieOptions);
        
        res.cookie("jwt", token, cookieOptions);
        console.log("Cookie set successfully");
        console.log("=== TOKEN GENERATION COMPLETED ===");
    } catch (error) {
        console.log("=== TOKEN GENERATION ERROR ===");
        console.log("Error:", error);
        throw error;
    }
}
export default createTokenAndSaveCookie;