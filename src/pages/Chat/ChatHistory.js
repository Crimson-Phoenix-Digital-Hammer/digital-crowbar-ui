// import { nanoid } from 'nanoid'
import React from 'react'
import { Badge, IconButton } from '@mui/material'
import { db } from '../../models/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { ModeCommentOutlined, ChatBubbleOutline, DeleteOutline, Clear  } from '@mui/icons-material'
import useLocalStorage from '../../hooks/useLocalStorage'

const truncate = (str, n) => {
    if(str.length <= n) return str;
    return str.slice(0, n - 3) + '...';
}

export const saveConvo = async () => {
    const data = await db.chat_history.toArray();
    
    const userMessage = data[0].content;
    const chatTitle = truncate(userMessage, 20);
    console.log(chatTitle);

    await db.conversations.add(
        {
            title: chatTitle,
            chat_history: data,
        }
    )
}
function ChatHistory() {

    // Chat History
    const convos = useLiveQuery(() => db.conversations.toArray(), [])
    const clearHistory = async () => await db.conversations.clear();
    const { removeItem } = useLocalStorage();

    const updateChat = async (id) => {
        const getChat = await db.conversations.get(id)
        // console.log(getChat);
        removeItem('chatHistory')
        localStorage.setItem('chatHistory', JSON.stringify(getChat.chat_history))
        window.location.reload(false);
    }

    const removeChat = async (id) => await db.conversations.delete(id);

    return (
        <div className='history-sidebar'>
            <div className='history-header'>
            <h2>Chat History</h2>
                <Badge
                    badgeContent={convos?.length}
                    max={50}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }} 
                    color="primary">
                    <ChatBubbleOutline />
                </Badge>
            </div>
            <div className='history-container'>
                {convos?.map((convo, index) => (
                    <ul key={index}>
                        <li><button className='convo-btn' size='medium' variant='outlined' onClick={() => updateChat(convo.id)}><ModeCommentOutlined /> {convo.title}</button> <IconButton className='remove-convo' onClick={() => removeChat(convo.id)}><Clear /></IconButton></li>
                    </ul>
                ))}
            </div>
            <div className='history-footer'>
                <button className='delete-chat' onClick={clearHistory}><DeleteOutline /> Clear History</button>
            </div>
        </div>
    )
}

export default ChatHistory