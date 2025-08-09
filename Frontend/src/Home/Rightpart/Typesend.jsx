import React, { useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from '../../Context/useSendMessage.js';

export default function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent empty message
    await sendMessages(message.trim());
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex space-x-3 h-[8vh] text-center bg-slate-800 items-center'>
        <div className='w-[70%] mx-4'>
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-ghost rounded-xl outline-none px-4 py-3 w-full"
          />
        </div>
        <button
          type="submit"
          className="text-3xl disabled:opacity-50"
          disabled={loading || message.trim() === ""}
        >
          <IoSendSharp />
        </button>
      </div>
    </form>
  );
}
