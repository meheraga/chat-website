import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    


    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();
    

    useEffect(() => {
        if (!currentUser || !currentUser.id) return;

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (docSnapshot) => {
            try {
                const items = docSnapshot.data()?.chats || [];

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    return {
                        ...userDocSnap.data(),
                        chatId: item.chatId,
                        lastMessage: item.lastMessage,
                        updatedAt: item.updatedAt
                    };
                });

                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        });

        return () => {
            unSub();
        };
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
       
        changeChat(chat.chatId,chat.searchedUser)
    }

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="search" />
                    <input type="text" placeholder="Search" />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    className="add"
                    alt="toggle add mode"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {Array.isArray(chats) ? chats.map((chat) => (
                <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}>
                    <img src={chat.avatar || "./avatar.png"} alt="avatar" />
                    <div className="texts">
                        <span>{chat.username || "Unknown User"}</span>
                        {/* <p>{chat.lastMessage || "No messages yet"}</p> */}
                    </div>
                </div>
            )) : null}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
