import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Divider, Grid, Paper } from '@mui/material'
import { ModeCommentOutlined, NotesOutlined, PhotoOutlined, BarChartOutlined, SettingsOutlined, HelpCenterOutlined, LogoutOutlined } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import logo from '../assets/images/dc-logo.png'
import Search from '../components/Search'
import Choices from '../components/Choices'
import {DescriptionOutlined, ImageOutlined,HistoryOutlined} from '@mui/icons-material/DescriptionOutlined'
import QueryHistory from '../components/QueryHistory'

function Alternatives() {
  return (
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
          <Search hideButtons />
          {/* <Choices /> */}
        </div>
      </Grid>
      {/* <Grid item md={2} xs={12}>
        <div className='chat-history'>
          <QueryHistory />
        </div>
      </Grid> */}
    </Grid>
  )
}

export default Alternatives