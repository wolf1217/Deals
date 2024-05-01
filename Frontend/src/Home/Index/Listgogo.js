import React, { useContext } from 'react'
import { Grid, List, ListItem, ListItemButton, Divider, Stack, createTheme, ThemeProvider, Typography } from '@mui/material'
import { CategoryContext } from './CategoryContext';


import { RiComputerFill } from "react-icons/ri";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdOutlineAlignHorizontalLeft } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdFace4 } from "react-icons/md";
import { GiSofa } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";


// const theme = createTheme({
//     typography: {
//       allVariants: {
//         color: 'white' 
//       }
//     }
//   });

function Listgogo() {

    const { category, setCategory } = useContext(CategoryContext);
    // console.log(category)
    const handleCategoryClick = (categoryName) => {
        setCategory(categoryName);
    };
    // console.log(category)
    return (
        <>
            {/* <ThemeProvider theme={theme}> */}
            <nav >
                <List >
                    <Stack spacing={2} >
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },
                            bgcolor: category === '' ? '#F5D46F' : '', color: category === '' ? 'white' : ''
                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('')} >
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><MdOutlineAlignHorizontalLeft size={25} /></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>綜合</Typography></Grid>
                                </Grid><Typography></Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },// 向上移動
                            bgcolor: category === '美食' ? '#F5D46F' : '', color: category === '美食' ? 'white' : ''

                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('美食')}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><MdFastfood size={25} /></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>美食</Typography></Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },// 向上移動
                            bgcolor: category === '旅遊' ? '#F5D46F' : '', color: category === '旅遊' ? 'white' : ''

                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('旅遊')}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><GiCommercialAirplane size={25} /></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>旅遊</Typography></Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },// 向上移動
                            bgcolor: category === '3C' ? '#F5D46F' : '', color: category === '3C' ? 'white' : ''

                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('3C')}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><RiComputerFill size={25} /></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>3C</Typography></Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },// 向上移動
                            bgcolor: category === '美妝' ? '#F5D46F' : '', color: category === '美妝' ? 'white' : ''

                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('美妝')}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><MdFace4 size={25} /></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>美妝</Typography></Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },// 向上移動
                            bgcolor: category === '信用卡' ? '#F5D46F' : '', color: category === '信用卡' ? 'white' : ''

                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('信用卡')}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><BsFillCreditCardFill size={25} /></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>信用卡</Typography></Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },// 向上移動
                            bgcolor: category === '家具' ? '#F5D46F' : '', color: category === '家具' ? 'white' : ''

                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('家具')}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><GiSofa size={25}/></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>家具</Typography></Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{
                            transition: 'transform 0.3s ease',  // 動畫
                            '&:hover': { transform: 'translateY(-10px)', bgcolor: '#F5D46F', color: 'white' },// 向上移動
                            bgcolor: category === '服飾' ? '#F5D46F' : '', color: category === '服飾' ? 'white' : ''

                        }}>
                            <ListItemButton onClick={() => handleCategoryClick('服飾')}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
                                    <Grid item sm={1}><GiClothes size={25} /></Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={6}><Typography>服飾</Typography></Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    </Stack>
                </List>
            </nav>
            {/* </ThemeProvider> */}

        </ >
    )
}
export default Listgogo