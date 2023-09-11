import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { SearchOutlined, NotificationsOutlined, ArrowUpwardOutlined, AttachFileOutlined, KeyboardVoiceOutlined } from '@mui/icons-material'
import './ChatApp.css'

function ChatApp() {
  const [messages, setMessages] = useState([
    { text: 'Hello, how can I help you?', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [responseText, setResponseText] = useState('');
  const [responseMessage, setResponseMessage] = useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, isUser: true };
    setMessages([...messages, newMessage]);

    // Simulate ChatGPT response (you can replace this with actual API calls)
    const url = 'https://api.digital-crowbar.com/obfuscate_text_query/chat';

    const requestBody = {
      system_message:
        'The user with present an initial query. Create a two-step process. 1. Find facts about the query. 2. Use those facts to develop a strategy to make a search without the search engine knowing what my original query are. Respond with two elements, an array of facts in JSON form, an array of strategies in JSON form.',
      chat_messages: [
        {
          role: 'user',
          content: newMessage.text,
        },
        // You can add more chat messages here if needed
      ],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const responseData = await response.json();
      // Handle the response data as needed, e.g., update state
      setResponseText(responseData.content);
      console.log('Response text:', responseData.content);

      // setResponseMessage([...responseMessage, { text: responseData.content, isUser: false }]);
      setMessages((prevMessages)=>[...prevMessages, { text: responseData.content, isUser: false }]);
      
    } catch (error) {
      console.error('Error:', error);
    }

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Combine user and bot messages into a single array
  // const messageList = messages.concat(responseMessage);

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h2>AI Obfuscation Helper</h2>
        <div className="chat-utils">
          <div className="chat-search-messages">
            <SearchOutlined />
            <input type="text" placeholder="Search in messages" />
          </div>
          <button className="chat-notifications"><NotificationsOutlined /></button>
        </div>

      </div>
      <div className="chat-container">
        <div className='messages'>
          {messages.map((message, index) => (
            <div id={index} key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='chat-footer'>
        <button className='attachment'><AttachFileOutlined /></button>
        <button className='voice-chat'><KeyboardVoiceOutlined /></button>
        <div className="input-container">
          <input
            type="text"
            placeholder="Start Typing..."
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button className='send' onClick={handleSend}><ArrowUpwardOutlined /></button>
      </div>
    </div>
  );
}

export default ChatApp;