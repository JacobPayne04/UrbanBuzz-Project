import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Message.css'; // Ensure you have the necessary CSS for styling

const Message = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch messages when the component mounts
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/messages/${userId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await axios.post('/api/messages', {
                senderId: userId,
                receiverId: 'someReceiverId', // Replace with actual receiver ID
                content: newMessage
            });

            setMessages([...messages, response.data.message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
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
    );
};

export default Message;