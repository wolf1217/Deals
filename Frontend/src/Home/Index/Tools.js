import { React, useState } from 'react'
import { InputLabel, MenuItem, FormControl, Select, SpeedDial, SpeedDialAction, createTheme, ThemeProvider, Stack, Box, IconButton ,} from '@mui/material'
import { NavLink } from 'react-router-dom';
import Appbar from './Appbar';

import { CiShare1 } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";



function Memuforplace() {

  const [place, setplace] = useState('')
  const clickplace = (event) => {
    setplace(event.target.value)
  }
  const [off, setoff] = useState('')
  const clicksetoff = (event) => {
    setoff(event.target.value)
  }

  return (
    // 標籤選單
    <>
      <FormControl size='small' fullWidth variant='outlined' sx={{ width: 120, px: 1, mt: 0.8 }}>
        <InputLabel>優惠地區</InputLabel>
        <Select value={place} label='地區' onChange={clickplace}>
          <MenuItem value={10}>全台通用</MenuItem>
          <MenuItem value={20}>僅限網路</MenuItem>
          <MenuItem value={30}>僅限台北</MenuItem>
          <MenuItem value={40}>僅限台中</MenuItem>
          <MenuItem value={50}>僅限高雄</MenuItem>
        </Select>
      </FormControl>
      <FormControl size='small' fullWidth variant='outlined' sx={{ width: 120, px: 1, mt: 0.8 }}>
        <InputLabel>優惠類別</InputLabel>
        <Select value={off} label='類別' onChange={clicksetoff}>
          <MenuItem value={10}>美食</MenuItem>
          <MenuItem value={20}>美妝</MenuItem>
          <MenuItem value={30}>旅遊</MenuItem>
          <MenuItem value={40}>遊戲</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

// 分享按鈕

function Shareicon() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f5f5f5',
        dark: '#29b6f6'
      }
    },

  })

  const actions = [
    { icon: <FaLine />, name: 'line' },
    { icon: <FaInstagram />, name: 'ig' },
    { icon: <CiFacebook />, name: 'fb' },
    { icon: <CiTwitter />, name: 'twitter' },
  ]

  return (<>
    <ThemeProvider theme={theme}>
      <SpeedDial
        ariaLabel="share"
        icon={<CiShare1 />}
        sx={{ transform: "scale(0.8)", }}


      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}

          />
        ))}
      </SpeedDial>
    </ThemeProvider>
  </>

  )
}
// 回到最上方按鈕
export function BacktotheTop() {
  return (
    <>
      <IconButton sx={{
        bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.7)',
        },
      }} >
        <IoIosArrowRoundUp />
      </IconButton>
    </>
  )
}





export { Memuforplace, Shareicon } 