import React from 'react';
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../Context/SocketContext.jsx';
import { CiMenuFries } from "react-icons/ci";


export default function Chatuser() {
  const { selectedConversation } = useConversation();
  const {onlineUsers}=useSocketContext();
  const getOnlineUsersStatus=(userId)=>{
    return onlineUsers.includes(userId)?"Online":"Offline";
  }


  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className='flex space-x-4 justify-center items-center h-[8vh] bg-gray-800 hover:bg-gray-600 duration-300'>
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
          <img
            src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
            alt="User Avatar"
          />
        </div>
      </div>
      <div>
        <h1 className='text-xl'>{selectedConversation.fullname}</h1>
        <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
      </div>
    </div>
    </div>
  );
}
