import Conversation from "../models/conversation.model.js";
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from "../SocketIO/server.js";

export const sendMessage=async(req,res)=>{
    try {
       const {message}=req.body; 
       const {id:receiverId}=req.params;
       const senderId=req.user._id; // Current logged in user
       let conversation=await Conversation.findOne({
        members:{$all:[senderId,receiverId]}
       })
       if(!conversation){
        conversation=await Conversation.create({
            members:[senderId,receiverId],
        });
       }
       const newMessage = new Message({   // we are storing these variables
        senderId,
        receiverId,
        message
       })
       if(newMessage){
        conversation.messages.push(newMessage._id);
       }
    await Promise.all([conversation.save(),newMessage.save()]) // Save parallely
    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }
    res.status(201).json({
        message: "Message sent successfully",
        newMessage
    });
    } catch (error) {
        console.log("Error in send message : "+error);
        res.status(500).json({error: "Internal server error"})
    }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] }
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);  // 200 OK is better than 201 here
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in getMessage:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
