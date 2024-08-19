import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../styling/Message.css';

const Message = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState(null);
    const { id } = useParams()


    // changed this ------------
    useEffect(() => {
        axios.get("http://localhost:8000/api/messages")
            .then(res => {
                console.log("✅✅✅✅ messages", res.data)
                setUsers(res.data)
            })
            .catch(err => console.log("❌❌❌❌", err))

    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
            .then(res => {
                console.log("✅✅✅✅", res.data)
                setUsers(res.data.users)
            })
            .catch(err => console.log("❌❌❌❌", err))

    }, [])

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !receiverId) return;

        try {
            const response = await axios.post('/api/messages/send', {
                sender: id,
                reciever: receiverId,
                content: newMessage
            });

            setMessages([...messages, response.data.message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="message-component">
            <div className="users-list">
                {users.map((user) => (
                    <div 
                        key={user._id} 
                        className="user-item"
                        onClick={() => setReceiverId(user._id)}
                    >
                        {user.username}
                    </div>
                ))}
            </div>
            <div className="message-container">
                <div className="messages-list">
                    {messages.map((message) => (
                        <div key={message._id} className="message-item">
                            <strong>{message.sender.name}:</strong> {message.content}
                        </div>
                    ))}
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Message;