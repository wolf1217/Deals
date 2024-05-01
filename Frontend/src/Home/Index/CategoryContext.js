import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';



export const CategoryContext = createContext();


export function CategoryProvider({ children }) {
    // 打開po文頁面
    const [pageopen, setpageopen] = useState(false)
    const onpenpage = () => {
        setpageopen(true)
    }
    // 下面是用來作為提示框的元素及動畫
    const closepage = () => setpageopen(false)//發文的
    // 處理提示的
    const [openforHint, setopenforHint] = useState(false)
    // 提示的文字
    const [textdata, settextdata] = useState('')
    useEffect(() => {

    }, [textdata])
    // 提示的開關
    const openHint = () => {
        setopenforHint(true)
        setTimeout(() => {
            setopenforHint(false);
        }, 3000);
    }
    const handleCloseHint = () => {
        setopenforHint(false);
    };
    // 提示文字的變化
    const handletext = () => {
        settextdata('發表失敗,請檢察*欄位是否填入')
    }
    const handletext1 = () => {
        settextdata('發表成功')
    }
    const handletext3 = (prop) => {
        settextdata(prop)
    }


    // 判斷現在的資料是哪一頁要的
    const [datapage, setdatapage] = useState('')

    // 喜歡按鈕
    const [loveStates, setLoveStates] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    // 不喜歡按鈕
    const [hateStates, setHateStates] = useState({});
    const [dislikeCounts, setDislikeCounts] = useState({});

    // 追蹤用戶點擊的標籤，預設為熱門文章
    const [selectedTab, setSelectedTab] = useState('hot');
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue || 'hot');
    };


    // 這是搜索及首頁篩選用的資料
    const [category, setCategory] = useState('');
    const [searchref, setsearchref] = useState('')
    const search = searchref

    // 初始載入文章數量
    const [postQuantity, setPostQuantity] = useState(8)

    const postclick = () => (
        setPostQuantity(postQuantity => postQuantity + 4)
    )

    // 從new2搬來的文章
    //使用者沒登入會彈出視窗
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const checkLoginStatus = () => {
        const token = Cookies.get('token');
        if (token) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    };


    // 將時間轉換為中文年月日格式
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0').replace(/^0+/, '');
        const day = date.getDate().toString().padStart(2, '0').replace(/^0+/, '');
        return `${year}年${month}月${day}日`;
    };

    // new2拿到的全部排序資料
    const [postbook, setPostBook] = useState([]);
    // 判斷是誰在呼叫
    const [whocall, setwhocall] = useState(0)

    const dataforabme = (prop) => {
        setwhocall(prop)
        // console.log(whocall)
    }

    const dontTaketoken = () => {
        setwhocall(0)
    }
    // 關於搜索以及排序，判斷是否按讚
    const fetchPostBook = () => {
        const token = Cookies.get('token')
        let url = `http://localhost/Prologin2/public/api/rank`;
        let params = new URLSearchParams();
        if (category !== '') {
            params.append('category', category);
        }
        if (search !== '') {
            params.append('search', search);
        }
        if (whocall === 1) {
            params.append('token', token);
        }

        axios.get(url, {
            params: params,
        })
            // 熱門排行規則
            .then(response => {
                const data = response.data;
                const dataArray = Object.values(data.merged_data);
                const getTimeScore = (dateStr) => {
                    const dateDiff = Math.ceil((new Date() - new Date(dateStr)) / (1000 * 3600 * 24));
                    if (dateDiff > 7) return 0;
                    else if (dateDiff > 3) return 1;
                    else return 2;
                };
                const sortedArticles = selectedTab === 'hot'
                    ? [...dataArray].sort((a, b) => {
                        const scoreA = (a.total_likes - a.total_dislikes) * getTimeScore(a.PostTime);
                        const scoreB = (b.total_likes - b.total_dislikes) * getTimeScore(b.PostTime);
                        if (scoreA === scoreB) {
                            return (b.total_likes - b.total_dislikes) - (a.total_likes - a.total_dislikes);
                        }
                        return scoreB - scoreA; // 降序排列
                    })
                    : [...dataArray].sort((a, b) => new Date(b.PostTime) - new Date(a.PostTime));
                setPostBook(sortedArticles);
                if (isUserLoggedIn) {
                    checkUserLikes(dataArray);
                } else {
                    setInitialLikes(dataArray);
                }
            })
            .catch(error => {
                console.error('Error fetching article:', error);
            });
    };


    // 檢查用戶是否有對文章按過讚
    const checkUserLikes = (dataArray) => {
        const token = Cookies.get('token');
        // if (token) {
        fetch('http://localhost/Prologin2/public/api/like'
            , {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    token: token
                })
            }
        )
            .then(response => response.json())
            .then(data => {
                // 使用filter將使用者按過讚的文章取出再用map印出
                const userLikes = data.filter(item => item.GiveLike === 1).map(item => item.WID);
                // console.log('有登入會跑這個出來')
                const userDislikes = data.filter(item => item.GiveDislike === 1).map(item => item.WID);
                // useStates綁定
                const loveStatesCopy = { ...loveStates };
                const hateStatesCopy = { ...hateStates };
                const likeCountsCopy = { ...likeCounts };
                const dislikeCountsCopy = { ...dislikeCounts };

                // 在此做判斷
                dataArray.forEach(article => {
                    if (userLikes.includes(article.WID)) {
                        loveStatesCopy[article.WID] = true;
                    } else {
                        loveStatesCopy[article.WID] = false;
                    }
                    if (userDislikes.includes(article.WID)) {
                        hateStatesCopy[article.WID] = true;
                    } else {
                        hateStatesCopy[article.WID] = false;
                    }
                    likeCountsCopy[article.WID] = parseInt(article.total_likes, 10);
                    dislikeCountsCopy[article.WID] = parseInt(article.total_dislikes, 10);
                });
                setLoveStates(loveStatesCopy);
                setHateStates(hateStatesCopy);
                setLikeCounts(likeCountsCopy);
                setDislikeCounts(dislikeCountsCopy);
            })
            .catch(error => console.error('Error:', error));
        // }
    };

    const setInitialLikes = (dataArray) => {
        const likeCountsCopy = { ...likeCounts };
        // console.log('沒登入會跑這個出來')
        const dislikeCountsCopy = { ...dislikeCounts };
        dataArray.forEach(article => {
            likeCountsCopy[article.WID] = parseInt(article.total_likes, 10);
            dislikeCountsCopy[article.WID] = parseInt(article.total_dislikes, 10);
        });
        setLikeCounts(likeCountsCopy);
        setDislikeCounts(dislikeCountsCopy);
    };



    const toggleLove = (wid) => {
        if (!isUserLoggedIn) {
            alert('請登入才能使用此功能');
            return;
        }
        // 如果文章已經點擊過不喜歡，點擊喜歡時，不喜歡總數-1且將愛心顏色設置為false
        if (hateStates[wid]) {
            setDislikeCounts(prevState => ({
                ...prevState,
                [wid]: dislikeCounts[wid] - 1
            }));
            setHateStates(prevState => ({
                ...prevState,
                [wid]: false
            }));
        }

        // 喜歡按鈕為true的話喜歡總數-1，為false則+1
        const newLikeCount = loveStates[wid] ? likeCounts[wid] - 1 : likeCounts[wid] + 1;

        setLikeCounts(prevState => ({
            ...prevState,
            [wid]: newLikeCount
        }));
        setLoveStates(prevState => ({
            ...prevState,
            [wid]: !prevState[wid]
        }));

        // 傳送action為like
        updateLikeDislike(wid, 'like');
    };

    const toggleHate = (wid) => {
        if (!isUserLoggedIn) {
            alert('請登入才能使用此功能');
            return;
        }
        if (loveStates[wid]) {
            setLikeCounts(prevState => ({
                ...prevState,
                [wid]: likeCounts[wid] - 1
            }));
            setLoveStates(prevState => ({
                ...prevState,
                [wid]: false
            }));
        }
        const newDislikeCount = hateStates[wid] ? dislikeCounts[wid] - 1 : dislikeCounts[wid] + 1;
        setDislikeCounts(prevState => ({
            ...prevState,
            [wid]: newDislikeCount
        }));
        setHateStates(prevState => ({
            ...prevState,
            [wid]: !prevState[wid]
        }));
        updateLikeDislike(wid, 'dislike');
    };


    // 存入使用者喜歡和不喜歡的資料
    const updateLikeDislike = (wid, action) => {
        const token = Cookies.get('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                wid: wid,
                token: token,
                action: action
            })
        };

        fetch('http://localhost/Prologin2/public/api/a', requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };




    const values = {
        category, setCategory,//篩選用
        searchref, setsearchref,//搜索用
        isUserLoggedIn, setIsUserLoggedIn,// 判斷登陸
        postbook, setPostBook,// new2拿到的全部排序資料
        checkLoginStatus, // 判斷登陸的函數
        postQuantity, postclick,//設定載入文章數量
        selectedTab, setSelectedTab,// 追蹤用戶點擊的標籤，預設為熱門文章
        // 喜歡按鈕
        loveStates, setLoveStates,
        likeCounts, setLikeCounts,
        // 不喜歡按鈕
        hateStates, setHateStates,
        dislikeCounts, setDislikeCounts,

        datapage, setdatapage,// 判斷現在的資料是哪一頁要的


        formatDate,//po文時間的轉換
        fetchPostBook,// 關於搜索以及排序，判斷是否按讚
        toggleLove,//點讚的登入才能使用此功能
        toggleHate,//倒讚的登入才能使用此功能
        dataforabme,//將篩選的資料傳給abpost
        dontTaketoken,//將token變回空字串
        handleTabChange,//最新文章以及熱門文章的切換
        // 提示的開關
        openHint,
        handleCloseHint,
        // 提示文字的變化
        handletext,
        handletext1,
        handletext3,
        closepage,//發文的關閉
        onpenpage,//呼叫po文頁面

        openforHint, setopenforHint,// 處理提示的
        textdata, settextdata,// 提示的文字
        pageopen, setpageopen,//po文頁面



    }
    return (
        <CategoryContext.Provider value={values}>
            {children}
        </CategoryContext.Provider>
    );
};
