import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, Divider, Modal, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ModeCommentOutlined, NotesOutlined, PhotoOutlined, BarChartOutlined, SettingsOutlined, HelpCenterOutlined, MoreHoriz, RecentActors, Add } from '@mui/icons-material'
import logo from '../assets/images/dc-logo.png'
import { defaultMessage } from '../models/populate';
import { saveConvo } from '../pages/Chat/ChatHistory';
import { db } from '../models/db';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(32,33,35,1)',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 3,
}
const getSystemMessage = JSON.parse(localStorage.getItem('System Message')) || defaultMessage
const setSystemMessage = (data) => {
    localStorage.setItem('System Message', JSON.stringify(data));
}

function MainNav() {
    const navLinks = [
        {
            title: 'AI Obfuscation Helper',
            path: '/',
            icon: <ModeCommentOutlined fontSize='large' />
        },
        {
            title: 'Text Search',
            path: '/text-search',
            icon: <NotesOutlined fontSize='large' />
        },
        {
            title: 'Image Search',
            path: '/image-search',
            icon: <PhotoOutlined fontSize='large' />
        },
        {
            title: 'Personas',
            path: '/personas',
            icon: <RecentActors fontSize='large' />
        },
        {
            title: 'Statistics',
            path: '/stats',
            icon: <BarChartOutlined fontSize='large' />
        },
        {
            title: 'Updates & FAQ',
            path: '/updates-and-faq',
            icon: <HelpCenterOutlined fontSize='large' />
        },
    ]

    const [systemPrompt, setSystemPrompt] = useState(getSystemMessage)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleChange = (e) => {
        setSystemPrompt(e.target.value);
    }

    const handleSaveSystemMessage = () => {
        setSystemMessage(systemPrompt);
        handleClose(); // close the modal after saving
    }
    const handleClearChat = async () => {
        localStorage.removeItem('chatHistory');
        await db.chat_history.clear();
        handleClose(); // close the modal after clearing chat
        window.location.reload(false);
    }
    const createNewChat = async () => {
        saveConvo()
        await db.chat_history.clear();
        localStorage.removeItem('chatHistory');
        window.location.reload(false);
    }

    return (
        <div className='main-menu'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.path}>{link.icon}<span>{link.title}</span></NavLink>
                        </li>
                    ))}
                    <li>
                        <Link onClick={handleOpen}><SettingsOutlined fontSize='large' /><span>Settings</span></Link>
                    </li>
                </ul>
            </nav>
            <footer className='sidebar-footer'>
                <Button className='save-convo' onClick={createNewChat} variant='outlined'><Add /> New Chat</Button>
                <Divider light={true} />
                <Link><span>My Account</span><MoreHoriz fontSize='large' /></Link>
            </footer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box style={{marginBottom:'30px', paddingBottom: '15px', borderBottom:'1px solid rgba(255,255,255, 0.25)' }}>
                        <Typography style={{ fontFamily: "Space Grotesk", color: '#fff' }} id="modal-modal-title" variant="h6" component="h2">
                            Settings
                        </Typography>
                    </Box>
                    <Typography style={{ fontFamily: "Space Grotesk", color: '#fff' }} id="modal-modal-title-1" component="h4">
                        Chat Instructions
                    </Typography>
                    <TextField
                        style={{ fontFamily: "Space Grotesk", marginTop:'20px', marginBottom: '20px', backgroundColor: 'rgba(32,33,35,0.15)'}}
                        fullWidth
                        className='field system-message'
                        label="Chat Instructions"
                        multiline
                        rows={8}
                        onChange={handleChange}
                        value={systemPrompt} // Corrected this line
                    />
                    <Box className='settings-buttons' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Button className='cancel' onClick={handleClose}>Cancel</Button>
                        <Button className='save' onClick={handleSaveSystemMessage}>Save</Button>
                    </Box>
                    <Box className='clear-history' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop:'20px', paddingTop: '15px', width:'100%', borderTop:'1px solid rgba(255,255,255, 0.25)' }}>
                        <Typography style={{ fontFamily: "Space Grotesk", marginBottom: '10px', color: '#fff' }} id="modal-modal-title-2" component="h4">
                            Chat History
                        </Typography>   
                        <Button className='clear' onClick={handleClearChat}>Clear History</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default MainNav