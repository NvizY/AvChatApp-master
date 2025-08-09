import React, { useState } from 'react'
import { RiLogoutCircleFill } from "react-icons/ri";
import api from "../../lib/api.js";
import Cookies from "js-cookie"

export default function Logout() {
  const [loading,setLoading]=useState(false)
  const handleLogout=async()=>{
    try {
      const res=await api.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      alert("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in logout : "+error)
    }
  }
  return (
   <div className='h-[10vh]'>
     <div>
        <RiLogoutCircleFill className='text-5xl text-white hover:bg-sky-700 duration-300 cursor-pointer rounded-full px-2 py-2 ml-2 mt-1' onClick={handleLogout} />
     </div>
   </div>
  );
}
