import React from 'react'
import User from './User';
import Logout from './Logout'
import useGetAllUsers from '../../Context/useGetAllUsers';


export default function Users() {
  const [allUsers,loading]=useGetAllUsers();
  console.log(allUsers);
  return (
    <div>
      <h1 className="flex items-center px-8 py-2 h-[6vh] text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div className='py-2 flex-1 overflow-y-auto hide-scrollbar' style={{maxHeight:"84vh"}}>
        {allUsers.map((user,index)=>(
          <User key={index} user={user}/>
        ))}
        <Logout/>
      </div>
    </div>
  );
}
