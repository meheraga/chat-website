import React from 'react'; // Import React (if you're using React 17 or earlier, this import is necessary)
import ChatList from "./chatList/ChatList"; // Correctly import ChatList component
import "./list.css"; // Ensure this path is correct
import Userinfo from "./userInfo/Userinfo"; // Correctly import Userinfo component and ensure the file name matches exactly, including case sensitivity

const List = () => {
  return (
    <div className='list'>
        <Userinfo /> {/* Use Userinfo component */}
        <ChatList /> {/* Use ChatList component */}
    </div>
  );
}

export default List;