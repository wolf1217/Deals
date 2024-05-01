import { React, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie';
// 頁面串接
import Newspage from './Newspage'
import { themeforbutton } from './Appbar';
import { TakePostcontext, TakePostProvider } from './AllApi/IndexAPI'
// mui
import { IconButton, Stack, Grid, Typography, ThemeProvider, CardContent, Badge, Button, Modal, CardActions, CardMedia, Card, Box, Avatar } from '@mui/material'
// 圖片(icon)
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


// 後面加的
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { CategoryContext } from './CategoryContext';
import { AboutmeContext } from '../AboutMe/AbRouter'
import axios from 'axios';




function New2() {

    // 從最大的爸爸拿到的資料
    const {
        category, selectedTab,//篩選判斷用
        searchref,//搜索用
        isUserLoggedIn, setIsUserLoggedIn, checkLoginStatus, //判斷登入
        postbook, setPostBook,//用來排序的的資料
        postQuantity, postclick,//設定載入文章數量
        formatDate,//po文時間的轉換
        // 喜歡按鈕
        loveStates, setLoveStates,
        likeCounts, setLikeCounts,
        // 不喜歡按鈕
        hateStates, setHateStates,
        dislikeCounts, setDislikeCounts,

        // 下面是函數
        fetchPostBook,// 關於搜索以及排序，判斷是否按讚
        toggleLove,//點讚的登入才能使用此功能
        toggleHate,//倒讚的登入才能使用此功能
        openHint, handletext3//提示框

    } = useContext(CategoryContext);
    const search = searchref

    console.log(postbook)
    // 從第二個爸爸拿到資料
    const { setpagedata,//切換首頁分類標籤
        handleWidUpdate, collect, collectforpost, //獲取收藏會用到(是一個陣列)
        checkcollectdata, setcheckcollectdata,  // 檢查用戶是否有對文章按過收藏
    } = useContext(TakePostcontext)

    //判斷優惠時間
    const checkDiscountStatus = (concessionStart, concessionEnd) => {
        const currentDate = new Date();

        const start = new Date(concessionStart);
        const end = new Date(concessionEnd);

        if (currentDate >= start && currentDate <= end) {
            return "優惠中";
        } else if (currentDate < start) {
            return "優惠未開始";
        } else {
            return "優惠已結束";
        }
    };


    // const { abmedata } = useContext(AboutmeContext)
    // const myuid = abmedata ? abmedata[3][0].UID : ''
    // console.log(myuid)
    //uid相等才會顯示刪除
    // const [checkmyuid, setcheckmyuid] = useState('')
    const deletepost = (wid) => {
        const url = `http://localhost/Prologin2/public/api/delete/${wid}`;
        axios.get(url, {
            params: {
                token: token
            }
        })
            .then((response) => {
                openHint()
                handletext3('刪除成功')
            })
            .catch((error) => {
                openHint()
                handletext3('刪除失敗 不是你的文章')
            });
    };

    // 1.點擊後將執行送出收藏的函數handleWidUpdate，接者自動執行collectforpost獲取收藏，會回傳一個陣列collect
    //2.將collect進行map，在滑鼠點擊按鈕時透過a函數傳送這篇文章的book.wid
    //3.將文章id與數組進行對比
    //4.將產生的值拿給收藏按鈕
    // console.log(collect)
    // const [lastcollect, setlastcollect] = useState(false)
    // const checkcollect = (wid) => {

    //     // 确保collect存在，然后在其中查找匹配的TargetWID
    //     // console.log(collect)
    //     const found = collect ? collect.find(prop => prop.TargetWID === wid) : 'undefined';
    //     if (found !== undefined) {
    //         setlastcollect(true)
    //     } else {
    //         setlastcollect(false);
    //     }

    // const lastcollect1 = result ? true:false
    // setcheckcollectdata(found); // 如果找到，则found为匹配对象，否则为null
    // setpagedata(wid)//傳入這篇文章的wid
    // console.log(collect)

    // }


    // useEffect(() => {
    //     checkcollect()
    //     collectforpost();
    // }, []);


    //token刪除文章用的
    const token = Cookies.get('token')

    // 網頁剛載入會執行的部分
    useEffect(() => {
        checkLoginStatus();
        fetchPostBook();
    }, [isUserLoggedIn, selectedTab, category, search]);





    //  內嵌式網頁
    const [pageopen, setpageopen] = useState(false)
    const onpenpage = (prop) => {
        setpageopen(true)
        setpagedata(prop)
    }
    // const collectClick = (prop) => (
    //     setpagedata(prop)
    // )


    const closepage = () => setpageopen(false)
    return (
        <>
            <Modal open={pageopen} onClose={closepage}>
                <Newspage closepage={closepage} />
            </Modal>


            {postbook.slice(0, postQuantity).map((bookdata, index) => (<div key={index}>
                <Grid item key={bookdata.WID}>
                    <Card sx={{
                        width: 250, height: 460, m: 3, bgcolor: '#F8F4F5', boxShadow: 5, position: 'relative'
                        , transition: 'transform 0.3s ease',  // 動畫
                        '&:hover': { transform: 'translateY(-20px)' }// 向上移動
                    }} key={bookdata.WID}>
                        {/* 圖 */}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button sx={{ height: 1 }} onClick={() => {
                                onpenpage(bookdata.WID);
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{ objectFit: 'contain', maxWidth: 250, maxHeight: 160 }}
                                    image={bookdata.ItemIMG ? `data:image/jpeg;base64,${bookdata.ItemIMG}` : '../NOIMG.jpg'}
                                />
                            </Button>
                        </Box>
                        {/* 折扣 */}
                        <Button disabled sx={{ position: 'absolute', top: 0, left: 0, bgcolor: checkDiscountStatus(bookdata.ConcessionStart, bookdata.ConcessionEnd) === '優惠未開始' || checkDiscountStatus(bookdata.ConcessionStart, bookdata.ConcessionEnd) === '優惠已結束' ? '#F5D46F' : '#D32F2F' }}>
                            <Typography sx={{
                                color: checkDiscountStatus(bookdata.ConcessionStart, bookdata.ConcessionEnd) === '優惠未開始' || checkDiscountStatus(bookdata.ConcessionStart, bookdata.ConcessionEnd) === '優惠已結束' ? '#757575' : '#FFFFFF'
                            }}>
                                {checkDiscountStatus(bookdata.ConcessionStart, bookdata.ConcessionEnd)}</Typography></Button>
                        {token ? <IconButton onClick={() => { deletepost(bookdata.WID) }} sx={{ position: 'absolute', top: 0, right: 0, }}><CloseOutlinedIcon /></IconButton> : ''}
                        {/* 內容 */}
                        <CardContent sx={{ height: 150 }}>
                            <Stack direction='row' spacing={2} >
                                <Typography variant="subtitle1" sx={{ color: 'red' }}>{bookdata.product_tag}</Typography>
                                <Typography variant="subtitle1" sx={{ color: 'red' }}>{bookdata.location_tag}</Typography>
                            </Stack>

                            <Typography variant="h6" >
                                {bookdata.Title.length > 10 ? `${bookdata.Title.slice(0, 10)}...` : bookdata.Title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {bookdata.Article.length > 50 ? `${bookdata.Article.slice(0, 50)}...` : bookdata.Article}
                            </Typography>
                        </CardContent>
                        {/* 按鈕 */}
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Stack direction='row' spacing={1} >

                                {/* 愛心 */}
                                <IconButton onClick={() => toggleLove(bookdata.WID)} >
                                    <Badge badgeContent={likeCounts[bookdata.WID]} color="error" showZero={true}>
                                        <FavoriteIcon sx={{ ':hover': { color: '#d50000' }, color: loveStates[bookdata.WID] ? '#d50000' : '#616161' }} />
                                    </Badge>
                                </IconButton>
                                {/* 不喜歡 */}
                                <IconButton onClick={() => toggleHate(bookdata.WID)} >
                                    <Badge badgeContent={dislikeCounts[bookdata.WID]} color="error" showZero={true}>
                                        <ThumbDownIcon sx={{ ':hover': { color: '#00AEAE' }, color: hateStates[bookdata.WID] ? '#00AEAE' : '#616161' }} />
                                    </Badge>
                                </IconButton>
                                {/* 收藏 */}
                                {/* <IconButton onClick={() => { handleWidUpdate(bookdata.WID); checkcollect(bookdata.WID) }} >
                                    <BookmarkOutlinedIcon sx={{ ':hover': { color: '#ffc107' }, color: lastcollect ? '#ffc107' : '#616161' }} />
                                </IconButton> */}

                                {/* 分享 */}
                                <IconButton>
                                    <SendSharpIcon sx={{ ':hover': { color: '#0277bd' } }} />
                                </IconButton>
                            </Stack>

                        </CardActions>
                        <Stack direction='row' px={1} spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar src={bookdata.image ? `data:image/jpeg;base64,${bookdata.image}` : '../ken1.jpg'} sx={{ border: 1 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                發文日期 : {formatDate(bookdata.PostTime)}
                            </Typography>
                        </Stack>

                    </Card>
                </Grid>
            </div>


            ))}

            {/* 按一下新增10篇文章 */}
            <ThemeProvider theme={themeforbutton}>
                {postbook.length > 0 ?
                    <Grid container my={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={postclick} sx={{ width: 100 }}>
                            加載更多
                        </Button>
                    </Grid>
                    :
                    <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>目前沒有文章</Typography>
                }
            </ThemeProvider>
        </>
    )
}
export default New2