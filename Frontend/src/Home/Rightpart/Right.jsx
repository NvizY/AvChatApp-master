import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../../zustand/useConversation.js'
import { useAuth } from '../../Context/Authprovider'
import { CiMenuFries } from "react-icons/ci";


export default function Right() {
  const {selectedConversation,setSelectedConversation}=useConversation();
  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation]);
  return (
    <div className="w-full bg-slate-900 text-gray-300 flex flex-col h-screen">
      {!selectedConversation?(<NoChatSelected/>):(
        <>
          <Chatuser />
          <div className="flex-1 overflow-hidden">
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  )
}

const NoChatSelected=()=>{
 const [authUser]=useAuth();
 return(
  <>
  <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {authUser.user.fullname}
            </span>
            <br />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
  </>
 )
}
