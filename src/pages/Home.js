import React, { useState } from 'react'
import './Home.css'
import { NavLink, Link } from 'react-router-dom'
import Search from '../components/Search'
import logo from '../assets/images/dc-logo.png'
import footerlogo from '../assets/images/crimson-phoenix-logo-footer.png'
import ChatApp from '../components/ChatApp'
import { styled } from '@mui/material/styles';
import { Container, Divider, Grid, Paper } from '@mui/material'
import { ModeCommentOutlined, NotesOutlined, PhotoOutlined, BarChartOutlined, SettingsOutlined, HelpCenterOutlined, LogoutOutlined } from '@mui/icons-material'
import QueryHistory from '../components/QueryHistory'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '94.5vh',
}));

function Home() {
  const [chatHistory, setChatHistory] = useState([])
  return (
    // <Container>
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
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
                <NavLink to="/stats"><BarChartOutlined fontSize='large' /><span>Statistics</span></NavLink>
              </li>
              <li>
                <NavLink to="/settings"><SettingsOutlined fontSize='large' /><span>Settings</span></NavLink>
              </li>
              <li>
                <NavLink to="/updates-and-faq"><HelpCenterOutlined fontSize='large' /><span>Updates & FAQ</span></NavLink>
              </li>
            </ul>
          </nav>
          <footer className='sidebar-footer'>
            <Divider light={true} />
            <Link to="/log-out"><span>Log Out</span><LogoutOutlined fontSize='large' /></Link>
          </footer>
        </div>
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
          <ChatApp />
        </div>
      </Grid>
      {/* <Grid item md={2} xs={12}>
        <div className='chat-history'>
          <QueryHistory />
        </div>
      </Grid> */}
    </Grid>
  );
}

export default Home;