
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
import { ArrowUpwardOutlined } from '@mui/icons-material';
import './ChatApp.css';
import 'highlight.js/styles/github-dark.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import { defaultMessage } from '../../models/populate';
import PersonaSelect from '../Personas/components/PersonaSelect';
import { db } from '../../models/db';
import ReactLinkify from 'react-linkify';
import CopyCode from './CopyCode';

hljs.registerLanguage('json', json);

// Constants & Helpers outside of the component
const chatAPIURL = 'https://api.digital-crowbar.com/obfuscate_text_query/chat';

// Format the JSON response from the chat API and extract the links
const cleanText = text => text.replace(/\n/g, '');
const makeJson = s2json => {
  const regex = /\{[\s\S]*?\}/g;
  const matches = cleanText(s2json).match(regex);

  if (matches && matches[0]) {
    const values = Object.values(JSON.parse(matches[0]));
    return values.map(item => `https://www.google.com/search?q=${encodeURIComponent(item).replace(/%20/g, '+')}`);
  }

  return [];
};

// Fetch data from the chat API
const fetchData = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.status === 200) {
    let apiCalls = JSON.parse(localStorage.getItem('API Calls')) || 0;
    apiCalls++;
    localStorage.setItem('API Calls', JSON.stringify(apiCalls));
  }

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return await response.json();
};

function ChatApp() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Please, enter your prompt' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiCalls, setApiCalls] = useState(0);
  const messageWrapperRef = useRef(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save messages to localStorage and handle syntax highlighting
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    hljs.highlightAll();
    if (messageWrapperRef.current) {
      messageWrapperRef.current.scrollTop = messageWrapperRef.current.scrollHeight;
    }
  }, [messages]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const getSystemMessage = JSON.parse(localStorage.getItem('System Message')) || defaultMessage;

  const handleInput = (e) => setInput(e.target.value);

  // Send the user's message to the chat API
  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    await db.chat_history.add(userMessage);

    const requestBody = {
      system_message: getSystemMessage,
      chat_messages: [...messages, userMessage],
    };

    localStorage.setItem('System Message', JSON.stringify(requestBody.system_message));

    try {
      const responseData = await fetchData(chatAPIURL, requestBody);
      let content = responseData.content;
      try {
        JSON.parse(content);

        // Wrap the JSON in a markdown code block
        content = `\`\`\`json\n${content}\n\`\`\``;
      } catch (e) { }

      const generatedLinks = makeJson(cleanText(content)).map(link => ({ role: 'assistant', content: link }));
      const responseMessage = {
        role: 'assistant',
        content: content,
      };

      await db.chat_history.bulkAdd([responseMessage, ...generatedLinks]);
      setMessages(prevMessages => [...prevMessages, responseMessage, ...generatedLinks]);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const linkDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h2>AI Obfuscation Helper</h2>
        <div className="chat-utils">
          <PersonaSelect />
        </div>
      </div>
      <div className="chat-container">
        <div id='message-wrapper' className='messages-wrapper'>
          <div className='messages'>
            {messages.map((message, index) => (
              <div id={index} key={index} className={`message ${message.role === 'user' ? 'user' : 'bot'}`}>
                {message.content.startsWith('```') && <CopyCode content={message.content} index={index} />}
                <div className='hljs links'>
                  {message.role === 'assistant' && message.content.startsWith('https://') ? (
                    <>
                      <ReactLinkify componentDecorator={linkDecorator}>
                        {message.content}
                      </ReactLinkify>
                      <AlwaysScrollToBottom />
                    </>
                  ) : (
                    <>
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                      <AlwaysScrollToBottom />
                    </>
                  )}
                </div>
              </div>
            ))}
            {isLoading ? (<div className="message bot typing-animation">
              <div className="typing-dot" style={{ '--delay': '0.2s' }}></div>
              <div className="typing-dot" style={{ '--delay': '0.3s' }}></div>
              <div className="typing-dot" style={{ '--delay': '0.4s' }}></div>
            </div>) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className='chat-footer'>
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