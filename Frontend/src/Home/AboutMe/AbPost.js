import { Divider, Grid, Typography } from '@mui/material'
import { React, useState, useContext } from 'react'
import { CategoryContext } from '../Index/CategoryContext'//拿文章的資料
import New2 from '../Index/New2'

export function AboutPost() {

    const {
        datapage, setdatapage
    } = useContext(CategoryContext)


    return (
        <>
            <Grid item xs={8} md={7} p={4} sx={{ height: 1, overflowY: 'scroll', boxShadow: 5,bgcolor:'white' }}>
                <Typography variant='h5'>我的文章<Divider />
                </Typography>
                <Grid container sx={{ justifyContent: 'center' }}>
                    <New2 />
                </Grid>
            </Grid>
        </>
    )
}




export default AboutPost