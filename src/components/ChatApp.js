import React, { useState, useRef, useEffect } from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'

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
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reqCount, setReqCount] = useState([]);
  // const bottomEl = useRef(null);
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  const setReq = (data) => {
    let a = [];
    a = JSON.parse(localStorage.getItem('chatGPT')) || [];
    a.push(data);
    localStorage.setItem('chatGPT', JSON.stringify(a));
  }
  const reqTime = (data) => {
    let a = [];
    a = JSON.parse(localStorage.getItem('chatGPT reqTime')) || [];
    a.push(data);
    localStorage.setItem('chatGPT reqTime', JSON.stringify(a));
  }
  const handleSend = async () => {
    if (input.trim() === '') return;

    setIsLoading(true);
    let start_time = new Date().getTime();

    const newMessage = { text: input, isUser: true };
    setMessages([...messages, newMessage]);

    setInput('');

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
      if(response.status === 200) {
        setReq("called")
        let request_time = new Date().getTime() - start_time;
        reqTime(request_time)
        // console.log("Request time: ", request_time);
      }
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const responseData = await response.json();
      // Handle the response data as needed, e.g., update state
      setResponseText(responseData.content);
      console.log('Response text:', responseData.content);

      setResponseMessage([...responseMessage, { role: 'assistant', content: responseData.content }]);
      requestBody.chat_messages.push({ role: 'assistant', content: responseData.content });
      setChatHistory((prevChatHistory)=>[...prevChatHistory, { chat_messages: requestBody.chat_messages }])
      
      console.log('Chat messages:', requestBody.chat_messages);

      setMessages((prevMessages)=>[...prevMessages, { text: responseData.content, isUser: false }]);
      // getChatHistory((prevChatHistory)=>[...prevChatHistory, messages]);

      console.log('Chat history:', chatHistory);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
    
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

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
        <div id='message-wrapper' className='messages-wrapper'>
          <div className='messages'>
            {messages.map((message, index) => (
                <div id={index} key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                  <div>
                    {/* {message.isUser ? `${message.text}` : <pre>{message.text}</pre>} */}
                    
                      <ReactMarkdown>
                        {message.text}
                      </ReactMarkdown>
                    
                    
                  </div>
                  <AlwaysScrollToBottom />
                </div>
              ))}
              {isLoading ? (<div className="message bot typing-animation">
                            <div className="typing-dot" style={{'--delay': '0.2s'}}></div>
                            <div className="typing-dot" style={{'--delay': '0.3s'}}></div>
                            <div className="typing-dot" style={{'--delay': '0.4s'}}></div>
                        </div>) : (
              <></>
            )}
          </div>
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