import React from 'react'
import { Grid } from '@mui/material'
import UploadFiles from './components/FileUpload'
import MainNav from '../../components/MainNav'

function ImageSearch() {

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav />
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
          <UploadFiles />
        </div>
      </Grid>
    </Grid>
  )
}

export default ImageSearch