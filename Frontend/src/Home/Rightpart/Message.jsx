import React from 'react'

export default function Message({message}) {
  const authUser=JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe=message.senderId===authUser.user._id;

  const chatName=itsMe?"chat-end":" chat-start";
  const chatColor=itsMe?"bg-gray-500":"bg-blue-700";

  const createdAt=new Date(message.createdAt);
  const formattedTime=createdAt.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
  return (
    <div>
      <div className='p-4'>
        <div className={`chat ${chatName}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              />
            </div>
          </div>
          <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
          <div className='text-2xs chat-footer'>{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}
