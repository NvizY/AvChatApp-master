import React from 'react'
import useConversation from '../../zustand/useConversation.js'



export default function User({ user }) {
  const {selectedConversation,setSelectedConversation}=useConversation();
  const isSelected=selectedConversation?._id===user._id;


  return (
    <div className={`hover:bg-slate-600 duration-300 ${isSelected?"bg-gray-500":""}`} onClick={()=>setSelectedConversation(user)}>
       <div className='flex space-x-7 px-8 py-4 hover:bg-gray-600 duration-300'>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
        </div>
        <div>
            <h1 className='font-bold'>{user.fullname}</h1>
            <span>{user.email}</span>
        </div>
      </div>
    </div>
  )
}
