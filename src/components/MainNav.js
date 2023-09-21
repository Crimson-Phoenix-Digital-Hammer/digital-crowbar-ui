import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, Divider, Modal, Popover, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ModeCommentOutlined, NotesOutlined, PhotoOutlined, BarChartOutlined, SettingsOutlined, HelpCenterOutlined, LogoutOutlined, MoreHoriz, RecentActors } from '@mui/icons-material'
import logo from '../assets/images/dc-logo.png'

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
const getSystemMessage = JSON.parse(localStorage.getItem('System Message')) || 'The user will present an initial query. Create a two-step process. 1. Find facts about the query. 2. Use those facts to develop a strategy to make a search without the search engine knowing what my original query is. Respond with two elements, a JSON Object of facts using Markdown, a JSON Object of strategies using Markdown.';
const setSystemMessage = (data) => {
    localStorage.setItem('System Message', JSON.stringify(data));
}

function MainNav() {
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
    const handleClearChat = () => {
        localStorage.removeItem('chatHistory');
        handleClose(); // close the modal after clearing chat
        window.location.reload(false);
    }

    return (
        <div className='main-menu'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/"><ModeCommentOutlined fontSize='large' /><span>AI Obfuscation Helper</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/text-search"><NotesOutlined fontSize='large' /><span>Text Search</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/image-search"><PhotoOutlined fontSize='large' /><span>Image Search</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/personas"><RecentActors fontSize='large' /><span>New Personas</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/stats"><BarChartOutlined fontSize='large' /><span>Statistics</span></NavLink>
                    </li>
                    <li>
                        <Link onClick={handleOpen}><SettingsOutlined fontSize='large' /><span>Settings</span></Link>
                    </li>
                    <li>
                        <NavLink to="/updates-and-faq"><HelpCenterOutlined fontSize='large' /><span>Updates & FAQ</span></NavLink>
                    </li>
                </ul>
            </nav>
            <footer className='sidebar-footer'>
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
                    <Box style={{}}>
                        <Typography style={{ fontFamily: "Space Grotesk", marginBottom: '20px', color: '#fff' }} id="modal-modal-title" variant="h6" component="h2">
                            Settings
                        </Typography>
                        
                    </Box>
                    <TextField
                        style={{ fontFamily: "Space Grotesk", marginBottom: '20px', backgroundColor: 'rgba(32,33,35,0.15)'}}
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
                        <Typography style={{ fontFamily: "Space Grotesk", marginBottom: '10px', color: '#fff' }} id="modal-modal-title-2" variant="h6" component="h4">
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