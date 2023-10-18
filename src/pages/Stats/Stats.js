import React, { useEffect } from 'react';
import { Grid, Paper, Button } from '@mui/material'
import { Autorenew, PaymentsOutlined, PriceChangeOutlined, SwapHoriz } from '@mui/icons-material'
import './Stats.css';
import MainNav from '../../components/MainNav';

function Stats() {
  const getLocalStorage = (key) => {
    const retrieveItem = JSON.parse(localStorage.getItem(key)) || [];
    console.log("retrieveItem: ", retrieveItem);
    return retrieveItem;
  }

  const getStats = () => {
    const totalCalls = getLocalStorage('API Calls');
    const sessionCost = totalCalls * 0.0036;
    const totalCost = sessionCost.toFixed(4);
    return totalCost
  }
  const pullStats = () => {
    getStats();
  }

  useEffect(() => {
    pullStats();
  }, [])


  const totalApiCalls = getLocalStorage('API Calls');

  const TotalRequests = () => {
    return (
      <Paper elevation={1} >
        <div className='stats-paper'>
          <div>
            <h2>{totalApiCalls}</h2>
            <span>Total Requests</span>
          </div>
          <div className='stats-icon'>
            <SwapHoriz fontSize='large' />
          </div>
        </div>
      </Paper>
    )
  }

  const CostPerRequest = () => {
    return (
      <Paper elevation={1} >
        <div className='stats-paper'>
          <div>
            <h2>$0.0036</h2>
            <span>Cost Per Request</span>
          </div>
          <div className='stats-icon'>
            <PaymentsOutlined fontSize='large' />
          </div>
        </div>
      </Paper>
    )
  }

  const CostPerSession = () => {
    const totalCost = getStats();
    return (
      <Paper elevation={1} >
        <div className='stats-paper'>
          <div>
            <h2>${totalCost}</h2>
            <span>Cost Per Session</span>
          </div>
          <div className='stats-icon'>
            <PriceChangeOutlined fontSize='large' />
          </div>
        </div>
      </Paper>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav />
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
          <div className='stats-container'>
            <div className="stats-header">
              <h2>Statistics</h2>
              <div className="stats-utils">
                <Button className='stats-button' onClick={() => pullStats()}><Autorenew /></Button>
              </div>
            </div>
            <div className='stats-body'>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item md={4} xs={12}>
                  <TotalRequests />
                </Grid>
                <Grid item md={4} xs={12}>
                  <CostPerRequest />
                </Grid>
                <Grid item md={4} xs={12}>
                  <CostPerSession />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}
export default Stats