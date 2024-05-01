import { Divider, Grid, Stack, Typography, Tooltip, Badge, Paper, TextField, Button, Avatar, ThemeProvider } from '@mui/material'
import { React, useState, useContext, useRef, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import { AboutmeContext } from './AbRouter'
// import {handleSubmit} from './AbMaterial'
import { CiImageOn } from "react-icons/ci";
import { themeforbutton } from '../Index/Appbar'
import { CategoryContext } from '../Index/CategoryContext'




export function AboutMaterial() {
    // 唯一id儲存使用者資料
    const sqlforname = useRef();
    const sqlforpassword = useRef();
    const sqlforme = useRef();
    const img = useRef()


    const { abmedata, dataformee } = useContext(AboutmeContext)
    useEffect(() => {
        dataformee()
    }, [])
    // 自我介紹
    const abme = abmedata ? abmedata[2][0].PersonalProfile : ''
    // 讚數
    // const good = abmedata ? abmedata[0][0].Sumlike : '0'
    //名稱
    const dataforname = abmedata ? abmedata[3][0].name : "";

    // 按鈕
    const [openaboutmetext, setopenaboutmetext] = useState(true)
    const [changetext, setchangetext] = useState('編輯')

    // 上傳圖片
    const [open, setopen] = useState(true)
    const openfile = () => (
        setopen(false)
    )

    const { openHint, handletext3 } = useContext(CategoryContext)

    const token = Cookies.get('token')
    const sendout = () => {
        const formData = new FormData();
        formData.append('token', token);
        formData.append('name', sqlforname.current.value);
        formData.append('password', sqlforpassword.current.value);
        formData.append('PersonalProfile', sqlforme.current.value);

        if (img.current && img.current.files[0]) {
            formData.append('image', img.current.files[0]);
        }
        console.log(img.current.files[0])
        axios({
            url: 'http://localhost/Prologin2/public/api/update',
            method: 'post',
            data: formData,
        })
            .then(function (response) {
                openHint()
                handletext3("傳送成功")
            })
            .catch(function (error) {
                openHint()
                handletext3("傳送失敗")

            });
    }
    const changeOpenmetext = () => {
        if (changetext === '編輯') {
            setopenaboutmetext(false);
            setchangetext('儲存')

        } else {
            setopenaboutmetext(true);
            setchangetext('編輯');
            sendout()
        }
    }

    const changeClosemetext = (prop2) => (
        setopenaboutmetext(true),
        setchangetext('編輯')
    )





    return (
        <>
            <ThemeProvider theme={themeforbutton}>

                <Grid item xs={8} md={7} p={4} sx={{ bgcolor: 'white', height: 1, boxShadow: 5 }}>
                    <Grid container sx={{ justifyContent: 'space-between', height: 0.05 }}>
                        <Typography variant='h5'>個人資料<Divider /></Typography>

                        <Grid item>
                            <Button onClick={changeClosemetext} sx={{ color: '#bdbdbd' }}>取消</Button>
                            <Button onClick={changeOpenmetext} >{changetext}</Button>
                        </Grid>
                    </Grid>

                    <Stack mt={5} spacing={2} sx={{ width: 1 }}>
                        <Button sx={{ for: 'image1', bgcolor: '#ffffff' }} onClick={openfile}>
                            <CiImageOn style={{ width: 40, height: 40 }} />
                            {<input type='file' ref={img} style={{ display: open ? 'none' : 'block' }} />}
                        </Button>
                        <TextField
                            label='暱稱'
                            defaultValue={dataforname}
                            disabled={openaboutmetext}
                            inputRef={sqlforname}
                        />
                        <TextField
                            label='密碼'
                            defaultValue={12345678}
                            disabled={openaboutmetext}
                            inputRef={sqlforpassword}
                            type='password'
                        />
                        <TextField
                            label='確認密碼'
                            defaultValue={12345678}
                            disabled={openaboutmetext}
                            type='password'
                        />
                       
                        <TextField
                            label="自我介紹"
                            defaultValue={abme}
                            multiline
                            rows={9}
                            variant="outlined"  // 確保設置了 variant 屬性
                            disabled={openaboutmetext}
                            inputRef={sqlforme}
                            InputLabelProps={{
                                shrink: true,  // 這會保證標籤在初始時就浮動上去，如果有 defaultValue
                            }}
                        />
                    </Stack>
                </Grid>
            </ThemeProvider>
        </>
    )
}