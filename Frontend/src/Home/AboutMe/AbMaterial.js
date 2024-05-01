import React, { useState, useContext, useRef, useEffect } from 'react';
import { Avatar, Tooltip, IconButton, Box, Grid, List, Stack, Typography, ThemeProvider, ListItemButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from "axios";
import Cookies from 'js-cookie';

// 連結的檔案
import { AboutMaterial } from './AbMeee'
import { AboutPost } from './AbPost'
import { AboutCollect } from './AbCollect'
import { AboutmeContext, Abupdate } from './AbRouter'
import { themeforbutton } from '../Index/Appbar'

//拿文章的資料
import { CategoryContext } from '../Index/CategoryContext'

// icon
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


// 存大頭貼
const Input = styled('input')({
  display: 'none'
})

export const Material = () => {
  // 唯一id(圖片的)
  const datanameid = useRef()

  const {
    dataforabme,//將篩選的資料傳給abpost
    fetchPostBook,//執行拿資料的函數
    postbook,//new2的資料
    posttoken,//將獲取的token傳送
    whocall
  } = useContext(CategoryContext)



  // 拿資料
  
  const { data, abmedata, dataformee } = useContext(AboutmeContext);
  const dataforgood = abmedata ? abmedata[0][0].Sumlike : "";
  const dataforname = abmedata ? abmedata[3][0].name : "";
  // 圖片
  const dataforimage = abmedata ? abmedata[2][0].image : "";


  const texterror1 = Cookies.get('token')
  // 網頁載入時執行以下函數
  // 圖片的狀態
  const [image, setImage] = useState('../ken1.jpg');
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  // console.log("dsdasdasdasdasd")
  // console.log(abmedata)



  // 切換按鈕
  const [open, setopen] = useState('abme')
  const openAboutMaterial = (prop) => (
    setopen('abme')
  )
  // const openAboutCollect = (prop) => {
  //   setopen('abCollect');
  // }
  const openAboutPost = (prop) => {
    setopen('abpost');
  }
  useEffect(() => {
    fetchPostBook();
    dataformee()
    openAboutMaterial()
  }, [])

  return (
    <>
      <ThemeProvider theme={themeforbutton}>
        <Stack mt={15} direction={'row'} sx={{ justifyContent: 'center' }}>
          <Grid container sx={{ width: 1500, height: 700, justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={4} md={2} sx={{ bgcolor: '#F8F4F5', height: 1, }}>
              <Stack spacing={2} p={5} sx={{ alignItems: 'center' }}>

                {/* 大頭貼 */}
                <Box sx={{ height: 80, width: 80, position: 'relative', '&:hover, &:focus': { '& .overlay': { display: 'flex' } } }}
                >
                  <Avatar src={dataforimage ? `data:image/jpeg;base64,${dataforimage}` : '../ken1.jpg'} alt="Profile" sx={{ height: 1, width: 1, border: 1 }} />
                </Box>
                {/* 名稱 */}
                <Typography>{dataforname}</Typography>
              </Stack>
              <Stack>
                <List sx={{ width: 0.95 }}
                  component='nav'
                >
                  <ListItemButton disabled >
                    <Typography variant='subtitle2'>列表</Typography>
                  </ListItemButton>
                  <ListItemButton onClick={openAboutMaterial} sx={{
                    transition: 'transform 0.3s ease',  // 動畫
                    '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },
                    bgcolor: open === 'abme' ? '#F5D46F' : '', color: open === 'abme' ? 'white' : ''

                  }}>
                    <Typography variant='subtitle2'>個人資料</Typography>
                  </ListItemButton>

                  <ListItemButton onClick={() => { openAboutPost(); dataforabme(1) }} sx={{
                    transition: 'transform 0.3s ease',  // 動畫
                    '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },
                    bgcolor: open === 'abpost' ? '#F5D46F' : '', color: open === 'abpost' ? 'white' : ''

                  }}>
                    <Typography variant='subtitle2'>我的文章</Typography>
                  </ListItemButton>
                  {/* <ListItemButton onClick={openAboutCollect} >
                  <Typography variant='subtitle2'>收藏文章</Typography>
                </ListItemButton> */}

                </List>
                <Grid container px={3} py={5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip title="被喜歡總數">
                    <Stack direction='row' spacing={4}>
                      <FavoriteIcon sx={{ width: 30, height: 30, color: '#d50000' }} />
                      <Typography variant='h5'>{dataforgood}</Typography>
                    </Stack>
                  </Tooltip>

                </Grid>
              </Stack>
            </Grid>
            {(open === 'abme') ? <AboutMaterial /> : <AboutPost />}
            {/* {(open === 'abme') ? <AboutMaterial /> : (open === 'abCollect') ? <AboutCollect /> : <AboutPost />} */}
          </Grid>
        </Stack >
      </ThemeProvider>
    </>
  )
};