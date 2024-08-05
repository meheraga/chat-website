import "./detail.css"
import React from 'react';
import { auth } from '@/lib/firebase.js';

const Detail = () => {
  return (
    <div className='detail'>
    <div className="user">
      <img src="./ally.jpeg"  />
      <h2>Ally Fernandes</h2>
      <p>Its All About Moments!</p>
    </div>
    <div className="info">
      <div className="option">
        <div className="title">
          <span>Chat Settings</span>
          <img src="./arrowUp.png"  />
        </div>
      </div>
      <div className="option">
        <div className="title">
          <span>Privacy & Help</span>
          <img src="./arrowUp.png"  />
        </div>
      </div>
      <div className="option">
        <div className="title">
          <span>Shared photos</span>
          <img src="./arrowDown.png"  />
        </div>
        
        <div className="photos">
          <div className="photoItem">
            <div className="photoDetail">
            <img src="./dress.jpg"  />
            <span>dress.jpg</span>
            </div>
          <img src="./download.png" className="icon"  />
          </div>
          <div className="photoItem">
            <div className="photoDetail">
            <img src="./dress.jpg"  />
            <span>dress.jpg</span>
            </div>
          <img src="./download.png" className="icon"   />
          </div>
          <div className="photoItem">
            <div className="photoDetail">
            <img src="./dress.jpg"  />
            <span>dress.jpg</span>
            </div>
          <img src="./download.png" className="icon"  />
          </div>
        </div>
      </div>
      <div className="option">
        <div className="title">
          <span>Shared Files</span>{}
          <img src="./arrowUp.png"  />
        </div>
      </div>
      <button>Block User</button>
      <button className="logout" onClick={() => auth.signOut()}>Logout</button>
    </div>
    </div>
  )
}

export default Detail