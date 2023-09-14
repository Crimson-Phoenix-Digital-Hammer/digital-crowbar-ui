import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
import { SearchOutlined, NotificationsOutlined, ArrowUpwardOutlined, AttachFileOutlined, KeyboardVoiceOutlined } from '@mui/icons-material';
import './ChatApp.css';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', json);

function ChatApp() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Please, enter your prompt' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Create a state for chat messages
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Please, enter your search term' },
  ]);

    // Load messages from localStorage on component mount
    useEffect(() => {
        const storedMessages = localStorage.getItem('chatHistory');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    // Save messages to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
      hljs.highlightAll();
    }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    setIsLoading(true);

    const newMessage = { role: 'user',content: input};
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate ChatGPT response (you can replace this with actual API calls)
    const url = 'https://api.digital-crowbar.com/obfuscate_text_query/chat';

    const requestBody = {
      system_message:
        'The user will present an initial query. Create a two-step process. 1. Find facts about the query. 2. Use those facts to develop a strategy to make a search without the search engine knowing what my original query is. Respond with two elements, an array of facts in JSON form with Markdown, an array of strategies in JSON form with Markdown.',
      chat_messages: [
        ...messages,
        {
          role: 'user',
          content: newMessage.content,
        },
      ],
    };
    // requestBody.chat_messages.push(messages);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        // Handle successful API request
      }

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const responseData = await response.json();
      const responseMessage = {
        role: 'assistant',
        content: responseData.content,
      };

      // Update the messages state for display
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
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
            <input type="text" placeholder="Search in messages" disabled />
          </div>
          <button className="chat-notifications" disabled><NotificationsOutlined /></button>
        </div>

      </div>
      <div className="chat-container">
        <div id='message-wrapper' className='messages-wrapper'>
          <div className='messages'>
            {messages.map((message, index) => (
                <div id={index} key={index} className={`message ${message.role == 'user' ? 'user' : 'bot'}`}>
                  <div>
                    {/* {message.isUser ? `${message.text}` : <pre>{message.text}</pre>} */}
                    
                      <ReactMarkdown>
                        {message.content}
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
        {/* <button className='attachment'><AttachFileOutlined /></button>
        <button className='voice-chat'><KeyboardVoiceOutlined /></button> */}
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