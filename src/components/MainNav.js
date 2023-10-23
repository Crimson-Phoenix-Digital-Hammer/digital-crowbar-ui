import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, Divider, Modal, Box, Typography } from '@mui/material'
import { ModeCommentOutlined, NotesOutlined, PhotoOutlined, BarChartOutlined, SettingsOutlined, HelpCenterOutlined, MoreHoriz, RecentActors, Add } from '@mui/icons-material'
import logo from '../assets/images/dc-logo.png'
import { saveConvo } from '../pages/Chat/ChatHistory';
import { db } from '../models/db';
import Settings from '../pages/Settings/Settings';

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

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
                <>
                    <Settings handleClose={handleClose} style={style} />
                </>
            </Modal>
        </div>
    )
}

export default MainNav