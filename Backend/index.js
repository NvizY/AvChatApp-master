import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";


import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import {app,server} from "./SocketIO/server.js";

dotenv.config();

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
