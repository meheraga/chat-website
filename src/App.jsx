import './index.css';
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useEffect } from "react";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import React from 'react';


const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
  });

  return () => {
     unSub();
  };
}, [fetchUserInfo]);


 if (isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container'>
      {
        currentUser ? (
          <>
      
      <List/>
      {chatId && <Chat/>}
      {chatId && <Detail/>}
      </> 
  ) : (
      <Login />
  )}
  <Notification/>
    </div>
  )
}

export default App