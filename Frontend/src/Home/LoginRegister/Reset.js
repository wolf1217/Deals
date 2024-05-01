import React, { useRef, useEffect,useContext } from 'react'
import Appbar,{themeforbutton} from '../Index/Appbar';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { CategoryContext } from '../Index/CategoryContext'


import { ThemeProvider, createTheme, Typography, Grid, TextField, CardMedia, Divider, Stack, Button } from '@mui/material';

function Reset() {
   
    // 信箱連結重設密碼
    const Resetpassword = useRef()
    const Checkpassword = useRef()
    let ValueToken
    let ValueEmail
    const { openHint, handletext3 } = useContext(CategoryContext)

    const navigate = useNavigate(); // 正確使用useNavigate
    useEffect(() => {
        const Url = new URLSearchParams(window.location.search);
        ValueToken = Url.get("token");
        ValueEmail = Url.get("email");

    }, [navigate]);


    const ResetToPHP = () => {
        axios({
            url: "http://localhost/Prologin2/public/api/resetpassword",
            method: "post",
            data: {
                token: ValueToken,
                email: ValueEmail,
                password: Resetpassword.current.value,
                password_confirmation: Checkpassword.current.value,
            }
        })
            .then(function (response) {
                openHint()
                handletext3('更改失敗 請檢察欄位');

            })
            .catch(function (error) {
                openHint()
                handletext3('更改成功');
            });
    }
    return (
        <>
            <Appbar />
            <ThemeProvider theme={themeforbutton}>
                <Grid container sx={{ width: 0.6, height: 0.7, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                    <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <CardMedia
                            component='img'
                            image='../LRimg.png'
                            sx={{ objectFit: 'contain', justifyContent: 'center' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} p={8} sx={{ bgcolor: 'white', borderRadius: 1, boxShadow: 10 }}>
                        <Stack spacing={2}>
                            <Typography variant='h5'>重設密碼</Typography>
                            <Typography variant='subtitle2'>想起帳號了嗎?
                                <NavLink to='/login'> 點我登入</NavLink>
                            </Typography>
                            <Divider />
                            <TextField sx={{ my: 1, width: 1, }} variant="filled" type='password' label="*新密碼" inputRef={Resetpassword} />
                            <TextField sx={{ my: 1, width: 1, }} variant="filled" type='password' label="*確認密碼" inputRef={Checkpassword} />
                            <Grid container m={10} sx={{ justifyContent: 'end' }}>
                                <Button onClick={ResetToPHP}  variant='contained'>重設密碼</Button>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default Reset