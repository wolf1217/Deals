import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import Appbar, { themeforbutton } from '../Index/Appbar';
import axios from "axios";
import Cookies from 'js-cookie';


import { CategoryContext } from '../Index/CategoryContext'



import { CssBaseline, Box, Typography, Grid, Fab, Paper, TextField, CardMedia, Divider, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function Login2() {
    const rvdata = useRef();
    const dataemail = useRef();
    const datapassword = useRef();

    // 驗證碼
    const [captchaImageUrl, setCaptchaImageUrl] = useState('');
    useEffect(() => {
        // 呼叫 API 以獲取驗證碼圖片
        captchaGetImageToPHP();
    }, []);
    const captchaGetImageToPHP = () => {
        axios({

            url: "http://localhost/Prologin2/public/api/reload-captcha",
            method: "get",
        })
            .then(function (response) {
                const imgSrc = response.data.captcha;
                console.log(imgSrc);

                // 使用正則表達式來擷取 src 屬性中的 URL
                const regex = /src="([^"]+)"/;
                const match = imgSrc.match(regex);
                // console.log(match);
                if (match && match.length > 1) {
                    const imageUrl = match[1];
                    setCaptchaImageUrl(imageUrl);
                    console.log(imageUrl);
                }

                // console.log(response.data.captcha);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const { openHint, handletext3 } = useContext(CategoryContext)

    // 登入

    const gotopage1 = useNavigate()
    function LoginFromSql() {


        axios({
            url: "http://localhost/Prologin2/public/api/login",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                captcha: Cookies.get("captcha"),
                email: dataemail.current.value,
                password: datapassword.current.value,
                rv: rvdata.current.value,
            }
        })
            .then(function (response) {
                openHint()
                handletext3('登入成功 3秒後跳轉至首頁');
                Cookies.set("token", response.data.authorization.token)
                setTimeout(() => {
                    gotopage1('/page1')
                }, 3000);

            })
            .catch(function (error) {
                openHint()
                handletext3("登入失敗 請檢察欄位是否正確");
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
                            <Typography variant='h5'>登入</Typography>
                            <Typography variant='subtitle2'>您是新用戶嗎? <NavLink to='/register'> 點我註冊</NavLink></Typography>

                            <Divider />
                            {/* <Typography variant='subtitle1' align='lift'>帳號</Typography> */}
                            <TextField sx={{ my: 1, width: 1, }} variant="filled" inputRef={dataemail} type='email' label="*信箱" />

                            {/* <Typography variant='subtitle1' align='lift'>密碼</Typography> */}
                            <TextField sx={{ my: 1, width: 1, }} variant="filled" inputRef={datapassword} type='password' label="*密碼" />
                            <TextField variant="filled" type="text" inputRef={rvdata} label="*驗證碼" />
                            <Stack spacing={2} direction='row'>
                                <img src={captchaImageUrl} id='abc' />
                                <Button onClick={captchaGetImageToPHP}>重新載入驗證碼</Button>
                            </Stack>
                            <Typography variant='subtitle2'>
                                <NavLink to='/forget'>忘記密碼?
                                </NavLink>
                            </Typography>
                            <Grid container m={10} sx={{ justifyContent: 'center' }}>
                                <Button variant='contained' onClick={() => LoginFromSql()}>登入</Button>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default Login2