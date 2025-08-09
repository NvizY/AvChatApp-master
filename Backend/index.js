import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";


import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import {app,server} from "./SocketIO/server.js";

dotenv.config();

console.log("=== SERVER STARTUP ===");
console.log("Environment variables check:");
console.log("- PORT:", process.env.PORT || "not set");
console.log("- NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("- MONGODB_URI exists:", !!process.env.MONGODB_URI);
console.log("- JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("- JWT_SECRET length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
console.log("- FRONTEND_ORIGIN:", process.env.FRONTEND_ORIGIN || "not set");

app.use(express.json()) //Middleware parses the data
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3001",
  credentials: true,
}));


const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Optional: exit the app if DB connection fails
  }
};

connectToMongoDB(); 

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
