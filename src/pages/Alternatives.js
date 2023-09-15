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
import MainNav from '../components/MainNav'

function Alternatives() {
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav />
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