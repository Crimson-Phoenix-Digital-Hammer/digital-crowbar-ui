import React, { useState } from 'react'
import { Grid } from '@mui/material'
import ChatApp from '../Chat/ChatApp'
import MainNav from '../../components/MainNav'
import ChatHistory from '../Chat/ChatHistory'

function Home() {
  const [systemPrompt, setSystemPrompt] = useState('')

  const setSysPrompt = (newPrompt) => {
    setSystemPrompt(newPrompt)
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav setSysPrompt={setSysPrompt} />
      </Grid>
      <Grid item md={7} xs={12}>
        <div className='main-content'>
          <ChatApp systemPrompt={systemPrompt} />
        </div>
      </Grid>
        <Grid item md={2} xs={12} style={{ paddingLeft: "0px", height: "95vh" }}>
          <ChatHistory />
        </Grid>
    </Grid>
  );
}

export default Home;