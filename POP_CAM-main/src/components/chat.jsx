import React, { useState, useEffect } from 'react';
import { connect, sendMessage } from '../services/websocketService';
import './Chat.css'; // Importing the CSS

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        connect((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = { sender: 'User', content: messageInput };
        sendMessage(newMessage);
        setMessageInput('');
    };

    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}</strong>: {msg.content}
                    </div>
                ))}
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="message-input"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;
