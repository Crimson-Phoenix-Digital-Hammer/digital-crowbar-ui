import React from 'react'
import { Grid } from '@mui/material'
import Search from './Search'
import MainNav from '../../components/MainNav'

function TextSearch() {
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav />
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
          <Search hideButtons />
        </div>
      </Grid>
    </Grid>
  )
}

export default TextSearch