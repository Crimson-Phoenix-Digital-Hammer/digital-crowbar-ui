import React from 'react'
import ImageSearch from './ImageSearch2'
import { Grid } from '@mui/material'
import MainNav from '../../components/MainNav'

function ImgSearch() {
    return (
        <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
                <MainNav />
            </Grid>
            <Grid item md={9} xs={12}>
                <div className='main-content'>
                    <ImageSearch />
                </div>
            </Grid>
        </Grid>
    )
}

export default ImgSearch