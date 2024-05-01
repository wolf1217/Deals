// import React, { useEffect, useState } from "react";
// import axios from 'axios';


// export function Homepage() {
//     const [ReportWID, setReportWID] = useState([]);
//     const [ReportWIDArticle, setReportWIDArticle] = useState([]);
//     const [ReportArticle, setReportArticle] = useState([]);
//     const [message, setMessage] = useState('');

//     const [GetName, setGetName] = useState([]);
//     // const [selectedUser, setSelectedUser] = useState(null);

    
//     useEffect(() => {
//         // 主頁顯示被檢舉用戶
//         axios.get(`http://localhost/Prologin2/public/api/GetName`)
//         .then(response => {
//             const ReportTrue = response.data.filter(post => post.ReportTimes != 0 && post.Hiding == 0);
//             // console.log(ReportTrue);
//             setGetName(ReportTrue);
//         })
//         .catch(error => {
//             console.error('Error :', error);
//           });
        
        
//     }, []);
    

//     // 點擊 "違規用戶按鈕" 後存資料用
//     const handleUserClick = (user) => {

//         // 主頁顯示被檢舉內容用
//         axios.get(`http://localhost/Prologin2/public/api/GetPost`)
//         .then(response => {
//             const ReportTrue = response.data.filter(post => post.ReportTimes != 0 && post.Hiding == 0 && post.id == user);
//             // console.log(ReportTrue);
//             setReportWID(ReportTrue);

//         })
//         .catch(error => {
//             console.error('Error :', error);
//           });
//     };


//     // 點擊 "顯示檢舉" 後顯示出該檢舉者之內容
//     const ShowReport = (PostID) => {
//         axios.get(`http://localhost/Prologin2/public/api/GetReport`)
//         .then(response => {
//             const ReportContent = response.data.filter(post => post.ReportWID == PostID);
//             console.log(ReportContent);
//             setReportArticle(ReportContent);
//             // setReportArticle(response.data);
//         })
//     };


//     // 點擊 "顯示文章" 後顯示出被檢舉的文章內容
//     const ShowPost = (PostID) => {
//         axios.get(`http://localhost/Prologin2/public/api/GetPost`)
//         .then(response => {
//             const PostContent = response.data.filter(post => post.WID == PostID);
//             // console.log(PostContent);
//             setReportWIDArticle(PostContent);
//         })
//     };


//     // 點擊 "隱藏文章" 後更改隱藏屬性
//     const HidingPost = (PostID) => {
//         axios.post(`http://localhost/Prologin2/public/api/HidePost`, { ReportWID: PostID })
//         .then(response => {
//             // setMessage(response.data.message);
//             console.log('文章已隱藏。');
//             console.log(ReportWID)
            
//             axios.post(`http://localhost/Prologin2/public/api/HideReport`, { id: PostID })
//             console.log(ReportWID)
//             .catch(error => {
//                 console.error('Error :', error);
//             });
//         })
//         .catch(error => {
//             console.error('Error :', error);
//         });
//     };


//     // 點擊 "取消檢舉" 後刪除檢舉
//     const CancelReport = (PostID) => {
//             axios.post(`http://localhost/Prologin2/public/api/CancelReport`, { id: PostID })
//             .then(response => {
//                 setMessage(response.data.message);
//                 console.log('檢舉已刪除。');
//             })
//             .catch(error => {
//                 console.error('Error :', error);
//             });
//     };


//     return (
//         <div>
//             <ul>
//             <h2>違規使用者</h2>
//                 {GetName.map(post => (
//                     <li key={post.ReportTimes}>
//                         <button onClick={() => handleUserClick(post.UID)}>ID: {post.UID} {post.name}</button>
//                     </li>
//                 ))}
//             </ul>
//             <ul>
//             <h2>違規文章</h2>
//                 {ReportWID.map(post => (
//                     <li key={post.WID}>
//                         <h3>{post.Title}</h3>
//                         <p>{post.Article}</p>
//                         <p>優惠開始時間: {post.ConcessionStart}</p>
//                         <p>Po文者: {post.name}</p>
//                         <button onClick={() => ShowReport(post.WID)}>顯示檢舉</button>
//                         <button onClick={() => ShowPost(post.WID)}>顯示文章</button>
//                     </li>
//                 ))}
//             </ul>
//             <ul>
//                 {ReportWIDArticle.map(post => (
//                     <li key={post.WID}>
//                         <h3>被檢舉文章</h3>
//                         <h4>{post.Title}</h4>
//                         <p>{post.Article}</p>
//                         <p>優惠開始時間: {post.ConcessionStart}</p>
//                         <p>Po文者: {post.name}</p>
//                         <br />
//                     </li>
//                 ))}
//             </ul>
//             <ul>
//                 {ReportArticle.map(post => (
//                     <li key={post.ReportWID}>
//                         <h3>檢舉者留言</h3>
//                         <h4>文章: {post.Title}</h4>
//                         <br />
//                         <p>檢舉原因: {post.ReportContent}</p>
//                         <p>檢舉者: {post.name}</p>
//                         <br />
//                         <button onClick={() => HidingPost(post.ReportWID)}>隱藏文章</button>
//                         <button onClick={() => CancelReport(post.WID)}>取消檢舉</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }