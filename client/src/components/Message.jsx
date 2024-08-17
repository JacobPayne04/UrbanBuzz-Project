import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import '../styling/Message.css';
const Message = () => {
  return (
    <div className="messagesPage">
      <div className="sidebar">
        <div className="user">
          <h2>John Doe</h2>
        </div>
        <div className="user">
          <h2>Jane Smith</h2>
        </div>
        <div className="user">
          <h2>Jacob Payne</h2>
        </div>
      </div>
      <div className="chat">
        <div className="messageContain">
          <div className="profbox">
            <h1>Messages</h1>
            
          </div>
          <div className="post">
            <h1>Jacob Payne</h1>
            <p>yo did you ever close on your contract??? - 9:57</p>
          </div>
          <div className="post">
            <h1>xander</h1>
            <p>yo - 10:29</p>
          </div>
          <div className="post">
            <h1>escobar</h1>
            <p>property closed today! - 2:37</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Message