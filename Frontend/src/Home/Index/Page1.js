import React, { useRef, useState, useContext, useEffect } from 'react'
import { Grid, Paper, Typography, createTheme, ThemeProvider, Divider, Stack, IconButton, Box, Button, Tabs, Tab, Slide } from '@mui/material'
// 資料引用
import New2 from './New2'
import Listgogo from './Listgogo'
import Appbar from './Appbar';
import { BacktotheTop } from './Tools'
import Treemap from './Treemap'
import { CategoryContext } from './CategoryContext'
// 底部icon
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaLine } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import axios from 'axios';
import { Carousel } from 'bootstrap';




const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    papercolor: {
      main: "#ebe6e5",
    }
  },
  components: {
    Paper: {
      styleOverrides: {
        elevation: '10',

      }
    }
  }
})

function Page1() {
  // 回到最上方
  const totop = useRef(null)
  const tothtop = () => {
    if (totop.current) {
      totop.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const { selectedTab, setSelectedTab, handleTabChange,
    dontTaketoken,//點擊首頁將值改為空字串提取全部文章

  } = useContext(CategoryContext)

  // 選染時執行一次資料重新拿取
  useEffect(() => dontTaketoken(), [])

  // 輪播
  const [images, setImages] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost/Prologin2/public/api/images')
      .then(response => {
        console.log(response.data.aa);
        setImages(response.data.aa);

        // 数据加载后再初始化轮播
        // 确保DOM已经包含所有轮播元素
        setTimeout(() => {
          const myCarouselElement = document.querySelector('#carouselExampleIndicators');
          if (myCarouselElement) {
            new Carousel(myCarouselElement, { 
              interval: 4000,
              wrap: true
            });
          }
        }, 0);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []); // 空依赖数组保证这个effect只在组件首次渲染时执行


  return (
    <>
      <ThemeProvider theme={theme}>
        <Appbar />
        <Stack ref={totop} />

        {/* 熱門趨勢改為輪播 */}
        <Grid container sx={{ justifyContent: 'center', mt: 10 }}>

          <Grid item xs={10} p={2} sx={{ bgcolor: '#F8F4F5' }}>
          <style>
            {`
              .carousel-control-prev-icon,
              .carousel-control-next-icon {
                background-image: none !important;
              }
              .img-fixed-height {
                height: 600px; 
                width: auto; 
                object-fit: cover; 
              }
            `}
            
          </style>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-inner">
                  {images.map((image, index) => (
                      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img src={`data:image/jpeg;base64,${image.image_url}`} className="img-fixed-height d-block w-100" alt="Carousel item" />
                          {/* <div className="carousel-caption d-none d-md-block">
                              <p>{image.description}</p>
                          </div> */}
                      </div>
                  ))}
              </div>
              {/* Carousel controls here */}
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                </svg>
                </span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                  </svg>
                </span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {/* <Typography  variant='h6' color='#000000'>熱門趨勢
              <Divider />
            </Typography> */}
            {/* <Treemap /> */}
          </Grid>
        </Grid>

        {/* 主框架 */}
        <Grid container mt={3} sx={{ flexWrap: 'nowrap', justifyContent: 'center' }}>
          {/* 回到最上方按鈕 */}
          <Box onClick={tothtop} sx={{ position: 'fixed', bottom: 5, right: 5, }}>
            <BacktotheTop />
          </Box>


          {/* 主題 */}
          <Grid item sm={3} md={2} sx={{ display: { xs: 'none', sm: 'block' }, mr: 1, height: 'auto', height: '80vh', pt: 1, bgcolor: '#F8F4F5' }}   >
            <Typography variant='h6' p={2} color='#000000' >
              主題<Divider />
            </Typography>
            <Listgogo />
          </Grid>


          {/* 最新文章 */}
          <Grid item xs={11} sm={8} sx={{ bgcolor: '#F8F4F5' }}>

            <Grid container sx={{ justifyContent: 'center', boxShadow: 1, }}>
              <Tabs value={selectedTab} onChange={handleTabChange} centered>
                <Tab value="hot" label="熱門文章"></Tab>
                <Tab value="latest" label="最新文章"></Tab>
              </Tabs>
            </Grid>

            <Grid container mt={1} sx={{ boxShadow: 1, justifyContent: 'center', bgcolor: 'rgba(4, 13, 18,0.8)' }}>
              <New2 />
            </Grid>

          </Grid>



          {/* footer */}
        </Grid>
        <Grid container mt={5} sx={{ bgcolor: "white", height: '15vh', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>

          <Grid item xs={8}>
            <Typography sx={{ textAlign: 'center' }} variant='h5'>關於我們</Typography>
          </Grid>

          <Grid item xs={4} >
            {/* 圖示 */}
            <Stack direction='row'>
              <IconButton sx={{ height: '50px', width: '50px' }}>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <CiInstagram />
                </a>
              </IconButton>
              <IconButton sx={{ height: '50px', width: '50px' }}>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <CiFacebook />
                </a>
              </IconButton>
              <IconButton sx={{ height: '50px', width: '50px' }}>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <FaLine />
                </a>
              </IconButton>
              <IconButton sx={{ height: '50px', width: '50px' }}>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <CiTwitter />
                </a>
              </IconButton>
            </Stack>
          </Grid>

        </Grid>
      </ThemeProvider >
    </>
  )
}

export default Page1