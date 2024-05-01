import React, { useState, useRef, useEffect, useContext } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';


// mui
import { Box, FormControl, InputLabel, IconButton, Typography, Paper, Stack, Select, MenuItem, TextField, Button, ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// 檔案
import { Memuforplace } from './Tools';
import AnimationHint from './animation/AnimationHint';
import { CategoryContext } from './CategoryContext'
import { themeforbutton } from './Appbar';


// 小圖
import { RiSendPlaneLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { AiOutlineSend } from "react-icons/ai";
import { CiVideoOn } from "react-icons/ci";
import { Article } from '@mui/icons-material';
function Edit() {

  // 拿提示框的資料
  const { closepage, openHint, handletext, handletext1 } = useContext(CategoryContext)

  // 抓id
  const article = useRef()
  const title = useRef()
  const startTime = useRef()
  const endTime = useRef()
  const placevalue = useRef()
  const change = useRef()
  const img = useRef()
  const refff = useRef()
  // 上傳圖片
  const [open, setopen] = useState(true)
  const openfile = () => (
    setopen(false)
  )
  // 選單的值

  const [place, setplace] = useState('')
  const clickplace = (event) => {
    setplace(event.target.value)
  }
  const [off, setoff] = useState('')
  const clicksetoff = (event) => {
    setoff(event.target.value)
  }


  // 時間轉換
  const formatDate = (place) => {
    const date = new Date(place);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0').replace(/^0+/, '');
    const day = date.getDate().toString().padStart(2, '0').replace(/^0+/, '');
    return `${year}-${month}-${day}`;
  };


  const gogo = () => {

    const formData = new FormData();
    formData.append('title', title.current.value);
    formData.append('Article', article.current.value);
    formData.append('token', Cookies.get('token'));
    formData.append('concessionStart', formatDate(startTime.current.value));
    formData.append('concessionEnd', formatDate(endTime.current.value));
    formData.append('location_tag', place);
    formData.append('product_tag', off);
    formData.append('ItemLink', refff.current.value);

    if (img.current && img.current.files[0]) {
      formData.append('itemImg', img.current.files[0]);
    }
    axios({
      url: 'http://localhost/Prologin2/public/api/articles/post',
      method: 'post',
      data: formData,

    })
      .then(function (response) {
        closepage()
        openHint()
        handletext1()
        console.log("成功", response.data);
      })
      .catch(function (error) {
        openHint()
        handletext()
        console.log("error", error);
      });
  }
  return (
    <>

      {/*  盒子本人 */}
      <ThemeProvider theme={themeforbutton}>

        <Box sx={{
          width: 800, height: 735, bgcolor: '#ffffff',
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflowY: 'scroll'
        }}>
          <Paper container sx={{ width: 751, m: 1, p: 1 }}>
            {/* 小容器-2 */}
            <Stack container spacing={1} sx={{ height: 1, p: 1 }}>

              {/* 會員名稱及標題 */}
              {/* <Stack container direction='row' spacing={3} sx={{ height: 30, alignItems: 'center', justifyContent: 'space-between', p: 1, }}>
            <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar src='./ken1.jpg' sx={{ height: 46, width: 46, border: 1 }} />
              <Typography color='error'>會員名稱</Typography>
            </Stack>
          </Stack>
          <Typography variant='subtitle2' sx={{ p: 1, alignItems: 'center' }}>發文時間:2024/01/30</Typography>
          <Divider /> */}

              {/* 會員標籤 */}
              <Stack direction='row' sx={{ height: 40, p: 2, alignItems: 'center', justifyContent: 'space-between', }}>
                <Stack direction='row' spacing={3} sx={{ width: 1, alignItems: 'end' }}>
                  <Stack direction='row' spacing={2}>
                    <FormControl size='small' fullWidth inputRef={placevalue} variant='outlined' sx={{ width: 120, px: 1, mt: 0.8 }}>
                      <InputLabel>優惠地區</InputLabel>
                      <Select value={place} label='地區' onChange={clickplace}>
                        <MenuItem value={'全台通用'}>全台通用</MenuItem>
                        <MenuItem value={'僅限網路'}>僅限網路</MenuItem>
                        <MenuItem value={'僅限台北'}>僅限台北</MenuItem>
                        <MenuItem value={'僅限台中'}>僅限台中</MenuItem>
                        <MenuItem value={'僅限高雄'}>僅限高雄</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size='small' fullWidth inputRef={change} variant='outlined' sx={{ width: 120, px: 1, mt: 0.8 }}>
                      <InputLabel>優惠類別</InputLabel>
                      <Select value={off} label='類別' onChange={clicksetoff}>
                        <MenuItem value={'美食'}>美食</MenuItem>
                        <MenuItem value={'美妝'}>美妝</MenuItem>
                        <MenuItem value={'旅遊'}>旅遊</MenuItem>
                        <MenuItem value={'遊戲'}>遊戲</MenuItem>
                        <MenuItem value={'3C'}>3C</MenuItem>
                        <MenuItem value={'信用卡'}>信用卡</MenuItem>
                      <MenuItem value={'家具'}>家具</MenuItem>
                      <MenuItem value={'服飾'}>服飾</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <TextField inputRef={title} label='*標題' variant='standard' sx={{ width: 0.8 }} />
                </Stack>
              </Stack>


              {/* 文章內容 */}
              <Stack container spacing={2} sx={{ height: 'auto', p: 2, }}>
                <TextField
                  label="優惠網址"
                  multiline
                  inputRef={refff}
                />
                <TextField
                  label="*請輸入文章內容"
                  multiline
                  rows={15}
                  inputRef={article}
                />
              </Stack>

              {/* 優惠時間 */}
              <Stack container direction='row' sx={{ height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker inputRef={startTime} label='*優惠開始時間' />
                  <Typography variant='subtitle1'>---</Typography>
                  <DatePicker inputRef={endTime} label='*優惠結束時間' />
                </LocalizationProvider>
              </Stack>
            </Stack>
          </Paper>
          {/* 照片上傳&取消&發布 */}
          <Stack container direction='row' sx={{ bgcolor: 'rgba(0,0,0,0.3)', height: 50, position: 'sticky', alignItems: 'center', justifyContent: 'space-around', bottom: 0, p: 1, }}>
            <Stack direction='row' container spacing={2}>
              <Button sx={{ for: 'image1', bgcolor: '#ffffff' }} onClick={openfile}>
                <CiImageOn style={{ width: 20, height: 20 }} />
                {<input type='file' ref={img} style={{ display: open ? 'none' : 'block' }} />}
              </Button>

              <Button onClick={closepage}>
                <Typography>取消</Typography>
              </Button>
              <Button onClick={gogo} sx={{ bgcolor: '#040D12',color:'#F8F4F5' }}>
                <AiOutlineSend />
                <Typography  >發送</Typography>
              </Button>

            </Stack>

          </Stack>

        </Box>
      </ThemeProvider>
    </>
  )
}

export default Edit