import { React, useState, useContext, useRef, useEffect } from 'react'
import { Box, IconButton, Typography, Button, Paper, Divider, Stack, CardMedia, Avatar, TextField, Grid, Link, ThemeProvider, } from '@mui/material'
import { TakePostcontext } from './AllApi/IndexAPI'
import { CategoryContext } from './CategoryContext';
import { themeforbutton } from './Appbar'

import axios from 'axios'
import Cookies from 'js-cookie';


// 表情包
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';


export default function Newspage({ closepage }) {

    // 拿使用者輸入資料欄位
    const MSG = useRef()

    // // 資料庫拿資料
    const { postdata, pagedata, posttime,
        handleWidUpdate, collect, collectforpost,//收藏
        subscribedata, setsubscribedata, // 訂閱的狀態即送出訂閱
        changesub,//寫死的訂閱


    } = useContext(TakePostcontext)

    const { bookdata, loveStates, toggleHate, hateStates, toggleLove,
        openHint, handletext3,//提示框
    } = useContext(CategoryContext)
    // rank的資料
    const article = postdata ? postdata.find(prop => prop.WID === pagedata) : '';
    // 李安的時間資料
    const datapost1 = posttime && posttime[0] ? posttime[0] : '沒有資料'
    const article1 = datapost1 ? datapost1.find((prop) => prop.wid == pagedata) : ''
    const postwid = article1.wid

    // 拿留言資料
    const wwid = useRef()
    const [msgdata, setmsgdata] = useState(null)
    useEffect(() => {

        // 拿留言資料
        axios.get(`http://localhost/Prologin2/public/api/PostMessage?WID=${postwid}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setmsgdata(response.data.postMessages)

            })
            .catch(error => {
                console.error('沒傳進去', error);
                // console.log(wwidData)

            });
    }, [setmsgdata]);



    // 李安的留言
    const MSGtosql = () => {
        const postwid = article.WID ? article.WID : ''
        axios({
            url: 'http://localhost/Prologin2/public/api/PostMessage/tosql',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                WID: postwid,
                MSGPost: MSG.current.value,
                token: Cookies.get('token')
            }
        })
            .then(function (response) {
                openHint()
                handletext3('文章留言發送成功')
            })
            .catch(function (error) {
                // console.log("文章留言發送失敗", error);
                openHint()
                handletext3('文章留言發送失敗')
            });
    }

    return (
        <>
            {/* 主容器 */}
            <ThemeProvider theme={themeforbutton}>

                <Box sx={{
                    width: 800, height: 900, bgcolor: '#F8F4F5',
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflowY: 'scroll'
                }}>

                    {/* 會員名稱及標題 */}
                    <Stack direction='row' spacing={2} sx={{ bgcolor: '#F8F4F5', height: 40, p: 2, alignItems: 'center', justifyContent: 'space-between', width: 1, position: 'sticky', top: 0, zIndex: 1 }}>
                        <Stack direction='row' spacing={2}>
                            <Button sx={{ bgcolor: '#F8F4F5' }}>
                                <Typography variant='subtitle1'>{article.product_tag ? article.product_tag : ''}</Typography>
                            </Button>
                            <Button>
                                <Typography variant='subtitle1'>{article.location_tag ? article.location_tag : ''}</Typography>
                            </Button>
                            <div ref={wwid} style={{ display: 'none' }}>{article.WID ? article.WID : ''}</div>

                        </Stack >
                        <Stack pr={5}>
                            <IconButton onClick={closepage} >
                                <CloseOutlinedIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Paper sx={{ width: 751, m: 1, p: 1 }}>


                        {/* 小容器-2 */}
                        <Stack spacing={3} sx={{ height: 1, p: 1 }}>
                            <Typography variant='h5' >{article.Title ? article.Title : ''}</Typography>
                            {/* 會員內標題及圖片*/}
                            <Grid container >
                                <Grid item xs={12} sx={{ alignItems: 'center', justifyContent: 'end' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ objectFit: 'contain', maxHeight: '30vh', maxWidth: 1 }}
                                        image={article.ItemIMG ? `data:image/jpeg;base64,${article.ItemIMG}` : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Button disabled ><Typography sx={{ color: '#d32f2f' }}>最高折扣{article.InProgress}%</Typography></Button>


                            <Stack spacing={2} >
                                <Stack direction='row' p={1} spacing={3} sx={{ justifyContent: 'center', bgcolor: '#eeeeee' }}>
                                    {/* 優惠時間 */}
                                    <Stack direction='row' spacing={2} sx={{ alignItems: 'center', justifyContent: 'start', }}>
                                        {/* 這裡是李安的資料 */}
                                        <Typography sx={{ textAlign: 'start', color: '#d32f2f' }}>優惠時間:</Typography>
                                        <Typography variant='subtitle1'>{article1.concessionStart ? article1.concessionStart : ''}</Typography>
                                        <Typography variant='subtitle1'>~</Typography>
                                        <Typography variant='subtitle1'>{article1.concessionEnd ? article1.concessionEnd : ''}</Typography>
                                    </Stack>
                                    <Button sx={{ bgcolor: '#F5D46F', ':hover': { bgcolor: '#f9a825' }, width: 250 }}>
                                        <Link href={article.ItemLink} color="inherit" target="_blank" sx={{ textAlign: 'center' }}>
                                            點我購買
                                        </Link >
                                    </Button>
                                </Stack>

                                <Typography variant='subtitle1' >
                                    {article.Article ? article.Article : ''}
                                </Typography>
                            </Stack>





                            {/* 會員標籤 */}
                            <Stack direction='row' spacing={2} sx={{ height: 30, alignItems: 'center', justifyContent: 'space-between', p: 1, }}>
                                <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                                    <Avatar src='./ken1.jpg' sx={{ height: 46, width: 46, border: 1 }} />
                                    <Typography color='error' variant='subtitle1'>作者:{article.name ? article.name : ''}</Typography>
                                    <Typography variant='subtitle2' sx={{ p: 1, alignItems: 'center' }}>{article.created_at ? article.created_at : ''}</Typography>
                                </Stack>
                                <Stack>
                                    <Button onClick={changesub} sx={{ bgcolor: subscribedata ? '#f9a825' : '#F5D46F', ':hover': { bgcolor: '#f9a825' } }}>
                                        <Typography sx={{ color: 'black' }}>訂閱</Typography>
                                    </Button>
                                </Stack>
                            </Stack>


                            <Divider />

                            {/* 廣告 */}
                            <Stack sx={{ height: 220, Width: 1 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ objectFit: 'cover', maxHeight: 1, Width: 1 }}
                                    image="../demo3.png"
                                />
                            </Stack>

                            {/* 留言 */}
                            <Stack sx={{ height: 'auto' }}>
                                <Divider />
                                <Typography mt={2}>留言</Typography>
                                {msgdata ? msgdata.map((prop, index) => (
                                    <div key={index}>
                                        <Stack m={2} spacing={2}>
                                            <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                                                <Avatar src='./ken1.jpg' sx={{ height: 46, width: 46, border: 1 }} />
                                                <Typography color='error' variant='subtitle2'>{prop.user_name}</Typography>
                                            </Stack>
                                            <Grid >
                                                <Typography variant='subtitle1'>{prop.MSGPost}</Typography>
                                                <Typography variant='subtitle2' mt={2} sx={{ color: '#9e9e9e' }}>{prop.MSGPostTime}</Typography>
                                            </Grid>
                                            <Divider />
                                        </Stack>
                                    </div>
                                )) :
                                    <Typography p={5} sx={{ textAlign: 'center' }}>目前沒有留言，成為第一個留言的人</Typography>
                                }
                            </Stack>
                        </Stack>
                    </Paper>


                    {/* 案讚訂閱分享 */}
                    <Stack direction='row' sx={{ height: 50, position: 'sticky', displayL: 'flex', alignItems: 'center', justifyContent: 'center', bottom: 0, p: 1, bgcolor: 'white', }}>
                        <TextField inputRef={MSG} sx={{ mx: 1, width: 0.5, borderRadius: '3' }} variant="outlined" size='small' type='text' label="留言....." />
                        <Button onClick={MSGtosql} sx={{ mr: 5, bgcolor: '#e0e0e0' }}>傳送</Button>
                        <Stack direction='row' spacing={2}>
                            {/* 愛心 */}
                            <IconButton onClick={() => toggleLove(pagedata)} >
                                <FavoriteIcon sx={{ ':hover': { color: '#d50000' }, color: loveStates[pagedata] ? '#d50000' : '#616161' }} />
                            </IconButton>
                            {/* 不喜歡 */}
                            <IconButton onClick={() => toggleHate(pagedata)} >
                                <ThumbDownIcon sx={{ ':hover': { color: '#616161' }, color: hateStates[pagedata] ? '#00AEAE' : '#616161' }} />
                            </IconButton>
                            {/* 收藏 */}
                            <IconButton onClick={() => { handleWidUpdate(); collectforpost() }} >
                                <BookmarkOutlinedIcon sx={{ ':hover': { color: '#ffc107' }, color: collect.isFavorited ? '#ffc107' : '#616161' }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>
            </ThemeProvider>
        </>
    )
}
