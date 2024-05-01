import React, { useState, createContext, useEffect } from 'react'
import axios from "axios";
import Cookies from 'js-cookie';

export const TakePostcontext = createContext()
export function TakePostProvider({ children }) {
  // 哲楨的rank文章資料
  const [postdata, setpostdata] = useState(null)
  // 李安的全部文章資料
  const [posttime, setposttime] = useState(null)
  // News2中點擊圖片後將wid傳遞到newspage
  const [pagedata, setpagedata] = useState(null)
  // 獲取收藏文章資料
  const [collect, setcollect] = useState([])

  // 專屬訂閱的狀態儲存
  const [subscribedata, setsubscribedata] = useState(false)
  const changesub = () => {
    setsubscribedata(!subscribedata)
  }
  // 檢查用戶是否有對文章按過收藏
  const [checkcollectdata, setcheckcollectdata] = useState(null)
  const token = Cookies.get('token')

  // 以下是內嵌式文章
  // 李安的獲取收藏
  const collectforpost = () => {
    console.log(pagedata)
    axios({
      url: `http://localhost/Prologin2/public/api/articles/${pagedata}/checkFavorite`,
      method: 'get',
      params: {
        token: token
      }
    })
      .then(function (response) {
        setcollect(response.data)

        console.log(response.data)
      })
      .catch(function (error) {
        console.log("收藏文章獲取失敗", error);

      });
  }
  const handleWidUpdate = () => {
    // 李安的點擊文章收藏
    console.log(pagedata)
    if (pagedata) {
      axios({
        url: `http://localhost/Prologin2/public/api/articles/${pagedata}/storeTarget`,
        method: 'post',
        data: {
          token: token
        }
      })
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log("收藏文章失敗", error);

        });
    }
  };

  useEffect(() => {
    // 哲楨的
    axios({
      url: 'http://localhost/Prologin2/public/api/rank',
      method: 'get',
    })
      .then(function (response) {
        const post = response.data.merged_data

        setpostdata(post)
        // console.log(post)
      })
      .catch(function (error) {
        console.log("文章加載失敗");
      });


    // 李安的文章
    axios({
      url: 'http://localhost/Prologin2/public/api/articles',
      method: 'get',
    })
      .then(function (response) {
        const post = Object.values(response.data)
        setposttime(post)
        // console.log(post[0])
      })
      .catch(function (error) {
        console.log("文章加載失敗");
      });


  }, [pagedata])

  // 李安的訂閱
  // const subscribe = () => {
  //   axios({
  //     url: `http://localhost/Prologin2/public/api/users/${subscribedata}/subscribe`,
  //     method: 'post',
  //     data: {
  //       token: Cookies.get('token')
  //     }
  //   })
  //     .then(function (response) {
  //       setsubscribedata(response.data)
  //       // console.log(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log("訂閱失敗", error);
  //     });
  // }

  const values = {
    postdata, setpostdata,
    pagedata, setpagedata,
    posttime, setposttime,
    collect, setcollect,//收藏的狀態
    subscribedata, setsubscribedata,//點擊訂閱的狀態
    subscribedata, setsubscribedata, // 訂閱的狀態儲存
    checkcollectdata, setcheckcollectdata,  // 檢查用戶是否有對文章按過收藏



    handleWidUpdate,
    collectforpost,//獲取收藏
    changesub,//寫死的訂閱
    // subscribe,//送出訂閱
  }
  return (
    <TakePostcontext.Provider value={values}>
      {children}
    </TakePostcontext.Provider>
  )

}

