import React from 'react'
import { Grid, Typography } from '@mui/material'

function ErrorPage() {
    return (
        <Grid container justify='center' alignItems='center' style={{ height: "90vh", placeContent: 'center' }}>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h5'>Page not found Quack!</Typography>
        </Grid>
    )
}

export default ErrorPage
