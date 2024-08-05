import "./chat.css";
import React, { useEffect } from 'react';
import EmojiPicker from "emoji-picker-react";
import { updateDoc, doc, onSnapshot, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload.js";

const Chat = () => {
  const [chat, setChat] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [img, setImg] = React.useState({
    file: null,
    url: "",
  });

  const currentUser = useUserStore(state => state.currentUser);
  const searchedUser = useUserStore(state => state.searchedUser);
  const chatId = useChatStore(state => state.chatId);
  
  const endref = React.useRef(null);

  useEffect(() => {
    endref.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!chatId) return;

    const unSub = onSnapshot(doc(db, "chats", chatId), 
    (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleSend = async () => {
    if (text === "" && !img.file) return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, searchedUser.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapShot = await getDoc(userChatsRef);

        if (userChatsSnapShot.exists()) {
          const userChatsData = userChatsSnapShot.data();
          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    setImg({
      file: null,
      url: ""
    });

    setText("");
  };

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./ally.jpeg" alt="avatar"/>
          <div className="texts">
            <span>Ally Fernandes</span>
            <p>Active now</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="phone"/>
          <img src="./video.png" alt="video"/>
          <img src="./info.png" alt="info"/>
        </div>
      </div>
      <div className="centre">
        {chat?.messages?.map((message, index) => (
          <div
            className={`message ${message.senderId === currentUser.id ? 'own' : 'received'}`}
            key={message.createdAt || index}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="message"/>}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="uploaded"/>
            </div>
          </div>
        )}
        <div ref={endref}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="img"/>
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleImg}/>
          <img src="./camera.png" alt="camera"/>
          <img src="./mic.png" alt="mic"/>
        </div>
        <input 
          type="text" 
          placeholder="Type a message" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="emoji" onClick={() => setOpen(prev => !prev)} />
          {open && <EmojiPicker className="picker" onEmojiClick={handleEmoji}/>}
        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
