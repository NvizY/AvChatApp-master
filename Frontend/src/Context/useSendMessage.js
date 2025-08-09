import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import api from "../lib/api.js";
import { useSocketContext } from "./SocketContext";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await api.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessage([...messages, res.data.newMessage]);
      socket.emit("sendMessage", {
        receiverId: selectedConversation._id,
        message: res.data.newMessage,
      });
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;