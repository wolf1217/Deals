import React, { useRef, useEffect, useState, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Appbar, { themeforbutton } from '../Index/Appbar';
import axios from "axios";
import Cookies from 'js-cookie';

import { CategoryContext } from '../Index/CategoryContext'



import { Typography, Grid, TextField, CardMedia, Divider, Stack, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function Register2() {
    const dataemail = useRef();
    const dataname = useRef();
    const datapassword = useRef();
    const datapassword2 = useRef();
    const rvdata = useRef();

    const emailToPHP = (email) => {
        axios({
            url: "http://localhost/Prologin2/public/api/email",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
            }
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const captchaGetImageToPHP = () => {
        axios({
            url: "http://localhost/Prologin2/public/api/reload-captcha",
            method: "get",
            headers: {
                'Content-Type': 'application/json',
            }

        })
            .then(function (response) {
                const imgSrc = response.data.captcha;
                // 使用正則表達式來擷取 src 屬性中的 URL
                const regex = /src="([^"]+)"/;
                const match = imgSrc.match(regex);
                // console.log(match);
                if (match && match.length > 1) {
                    const imageUrl = match[1];
                    setCaptchaImageUrl(imageUrl);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    // 驗證碼
    const [captchaImageUrl, setCaptchaImageUrl] = useState('');

    useEffect(() => {
        // 信箱驗證點擊獲取 URL 查詢參數中的驗證郵箱
        const Url = new URLSearchParams(window.location.search);
        const verifiedEmail = Url.get("email");
        // 如果存在驗證郵箱，則發送 POST 請求到後端
        if (verifiedEmail) {
            emailToPHP(verifiedEmail);
        }
        // 呼叫 API 以獲取驗證碼圖片
        captchaGetImageToPHP();
    }, []);

    //切換頁面
    const gotologin = useNavigate()
    const location = useLocation();//跳轉網址用的
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        if (email) {
            gotologin('./login')
        }
    }, []);


    const { openHint, handletext3 } = useContext(CategoryContext)
    const InserttoSql = () => {
        axios({
            url: "http://localhost/Prologin2/public/api/register",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: dataemail.current.value,
                name: dataname.current.value,
                password: datapassword.current.value,
                captcha: Cookies.get("captcha"),
                rv: rvdata.current.value
            }
        })
            .then(function (response) {
                openHint()
                handletext3("註冊成功 請檢查信件並完成郵箱驗證");
            })
            .catch(function (error) {
                openHint()
                handletext3("註冊失敗 請檢察欄位是否正確")

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
                            <Typography variant='h5'>註冊</Typography>
                            <Typography variant='subtitle2'>有帳號了嗎?<NavLink to='/login'> 點我登入</NavLink> </Typography>

                            <Divider />
                            <TextField sx={{ my: 1, width: 1 }} variant="filled" name='email' inputRef={dataemail} type='email' label="*信箱" />
                            <TextField sx={{ my: 1, width: 1 }} variant="filled" name='name' inputRef={dataname} type='text' label="名稱" />
                            <TextField sx={{ my: 1, width: 1 }} variant="filled" name='password' inputRef={datapassword} type='password' label="*密碼" />
                            <TextField sx={{ my: 1, width: 1, color: 'red' }} variant="filled" name='password' inputRef={datapassword2} type='password' label="*確認密碼" />
                            <TextField variant="filled" type="text" inputRef={rvdata} label="*驗證碼" />
                            <Stack spacing={2} direction='row'>
                                <img src={captchaImageUrl} id='abc' />
                                <Button onClick={captchaGetImageToPHP}>重新載入驗證碼</Button>
                            </Stack>
                            <Grid container m={10} sx={{ justifyContent: 'center' }}>
                                <Button variant='contained' onClick={() => InserttoSql()}>註冊</Button>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default Register2