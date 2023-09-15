import React, { useState } from 'react'
import './Home.css'
import ChatApp from '../components/ChatApp'
import { styled } from '@mui/material/styles';
import { Container, Divider, Grid, Paper } from '@mui/material'
import QueryHistory from '../components/QueryHistory'
import MainNav from '../components/MainNav';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '94.5vh',
}));

function Home() {
  const [systemPrompt, setSystemPrompt] = useState('');

  const setSysPrompt = (newPrompt) => {
    setSystemPrompt(newPrompt);
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav setSysPrompt={setSysPrompt} />
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
        <ChatApp systemPrompt={systemPrompt} />
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;