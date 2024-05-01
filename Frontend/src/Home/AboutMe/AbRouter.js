import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { CategoryContext } from '../Index/CategoryContext'


// 創建上文
export const AboutmeContext = createContext();

// axios接資料(關於我)
export const AboutmeProvider = ({ children }) => {
    // 關於我全部的資料
    const [data, setData] = useState(null);
    // 文章資料
    const [newspagedata, setnewspagedata] = useState(null)
    // 文章的WID
    const [selectedArticle, setSelectedArticle] = useState(null)

    // 網頁加載完時渲染關於我及部分文章資料
    // 接收關於我的資料
    const [abmedata, setabmedata] = useState()
    const dataformee = () => {
        const url = 'http://localhost/Prologin2/public/api/aboutme'
        const token = Cookies.get('token')
        axios.post(url, { token: token })
            .then((response) => {
                const data1 = Object.values(response.data)
                setabmedata(data1)
                // console.log(data1[3][0].UID)
            })
            .catch((error) => {
                console.error('Error:', error);  // 错误处理
            });
    }

    // 網頁加載完時渲染關於我留言資料
    const [aboutmemsg, setaboutmemsg] = useState(null)
    useEffect(() => {
        axios({
            url: 'http://localhost/Prologin2/public/api/post',
            method: 'post',
            data: {
                token: Cookies.get('token'),
            },
        })
            .then(function (response) {
                const aboutpostmsg = Object.values(response.data)
                setaboutmemsg(aboutpostmsg);

            })
            .catch(function (error) {
                console.log('失敗');
            });
    }, []);
    // console.log(aboutmemsg)

    // 把所有的狀態都塞進去
    const allvalue = {
        data,
        setData,
        selectedArticle,
        setSelectedArticle,
        newspagedata,
        setnewspagedata,
        aboutmemsg,
        setaboutmemsg,
        abmedata, setabmedata,
        dataformee
    }

    //   提供上文資料
    return (
        <AboutmeContext.Provider value={allvalue}>
            {children}
        </AboutmeContext.Provider>
    );
};

