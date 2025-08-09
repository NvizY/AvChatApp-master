import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

export default function Left() {
  return (
    <div className='w-full bg-[#1E1E2F] text-gray-300'>
        <Search/>
       <div className='flex-1 overflow-y-auto hide-scrollbar' style={{minHeight:"84vh"}}>
        <Users/>
       </div>
    </div>
  )
}
