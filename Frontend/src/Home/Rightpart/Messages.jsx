import React, { useEffect, useRef } from 'react'
import Message from './Message';
import useGetMessage from '../../Context/useGetMessage.js';
import Loading from "../../Components/Loading.jsx";
import useGetSocketMessage from '../../Context/useGetSocketMessage.js';

export default function Messages() {
  const { loading, messages }=useGetMessage();
  useGetSocketMessage(); // listening to incoming messages
  console.log(messages);

  const lastMsgRef=useRef();
  useEffect(()=>{
    setTimeout(()=>{
    if(lastMsgRef.current){
      lastMsgRef.current.scrollIntoView({behavior:"smooth"});
    }
  },1000);
  },[messages]);

  return (
    <div className='h-full overflow-y-auto px-4 pb-4 hide-scrollbar'>

     {loading?(<Loading/>):(messages.length>0 && messages.map((message)=>(
      <div key={message._id} ref={lastMsgRef}>
        <Message key={message._id} message={message}/>
      </div>
     )))}

      {!loading && messages.length===0 && (
        <div className="h-full flex items-center justify-center">
          <p className='text-center'>Say Hi! to start the conversation</p>
        </div>
      )}
    </div>
  );
}
