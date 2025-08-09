import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Cookies from "js-cookie"
import api from "../lib/api.js"

export default function useGetAllUsers() {
  const  [allUsers,setAllUsers]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    const getUsers=async()=>{
        setLoading(true);
         try {
            const token=Cookies.get("jwt");
            console.log("JWT Token exists:", !!token);
            const response=await api.get("/api/user/allUsers");
            console.log("Users fetched successfully:", response.data);
            setAllUsers(response.data);
            setLoading(false);
          }catch (error) {
        console.log("Error in useGetAllUsers:", error.response?.data || error.message);
        setLoading(false);
    }
    }
    getUsers()
  },[])
  return [allUsers,loading]
}
