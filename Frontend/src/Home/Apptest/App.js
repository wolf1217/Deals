import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'
import Cookies from 'js-cookie';

function Register() {
  const Myname = useRef();
  const Myemail = useRef();
  const Mypassword = useRef();
  const LoginMyemail = useRef();
  const LoginMypassword = useRef();
  const UpdateMyname = useRef()
  const UpdateMypassword = useRef()
  const UpdateMyimage = useRef();
  const Usersearch = useRef();
  const Forgetemail = useRef();
  const Resetemail = useRef();
  const Resetpassword = useRef();
  const Checkpassword = useRef();
  const Resettoken = useRef();
  const Verification_code = useRef();
  const RV = useRef();

  // 驗證碼頁面 -------------------------------- 
  const [captchaImageUrl, setCaptchaImageUrl] = useState('');

  useEffect(() => {
    // 呼叫 API 以獲取驗證碼圖片
    captchaGetImageToPHP();
  }, []);

  // 驗證碼圖片
  const captchaGetImageToPHP = () => {
    axios({
      url: "http://localhost/Prologin2/public/api/reload-captcha",
      method: "get",
    })
      .then(function (response) {
        const imgSrc = response.data.captcha;
        console.log(imgSrc);

        // 使用正則表達式來擷取 src 屬性中的 URL
        const regex = /src="([^"]+)"/;
        const match = imgSrc.match(regex);
        // console.log(match);
        if (match && match.length > 1) {
          const imageUrl = match[1];
          setCaptchaImageUrl(imageUrl);
          console.log(imageUrl);
        }

        // console.log(response.data.captcha);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

 


  // 搜索系統
  const searchToPHP = () => {
    axios({
      url: "http://localhost/Prologin2/public/api/search",
      method: "post",
      data: {
        search: Usersearch.current.value,
      }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  

  // 註冊系統
  // console.log(Cookies.set("captcha"))

  const insertToPHP = () => {
    axios({
      url: "http://localhost/Prologin2/public/api/register",
      method: "post",
      data: {
        name: Myname.current.value,
        email: Myemail.current.value,
        password: Mypassword.current.value,
        captcha: Cookies.get("captcha"),
        rv: RV.current.value, 
      }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // 信箱驗證點擊 --------------------------------

    useEffect(() => {
        // 獲取 URL 查詢參數中的驗證郵箱
        const Url = new URLSearchParams(window.location.search);
        const verifiedEmail = Url.get("email");
        // console.log(verifiedEmail);
        // 如果存在驗證郵箱，則發送 POST 請求到後端
        if (verifiedEmail) {
            emailToPHP(verifiedEmail);
            
        }
    }, []);

    const emailToPHP = (email) => {
        axios({
            url: "http://localhost/Prologin2/public/api/email",
            method: "post",
            data: {
                email: email,
            }
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    }

  // 登入頁面 --------------------------------
  const loginToPHP = () => {
    axios({
      url: "http://localhost/Prologin2/public/api/login",
      method: "post",
      data: {
        email: LoginMyemail.current.value,
        password: LoginMypassword.current.value,
        verification: Verification_code.current.value,
        captcha: Cookies.get("captcha"),  // 驗證碼的答案
      }
    })
    .then(function (response) {
      // console.log(response.status);
      if (response.status === 200) {
        console.log(response.data);
        Cookies.set("token", response.data.authorization.token);
      } else {
        // console.log(response.data);
        console.log("失敗");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  // 修改系統
  const UpdateAxios = (imageValue, imageSrc) => {
    axios({
      url: "http://localhost/Prologin2/public/api/update",
      method: "post",
      data: {
        imageApple: imageValue,
        name: UpdateMyname.current.value,
        password: UpdateMypassword.current.value,
        token: Cookies.get('token'),
      },

    })
      .then(function (response) {
        console.log(response.data);
        if (imageSrc) {
          document.getElementById('appledog').src = response.data.src;
        }
        else {
          document.getElementById('appledog').src = "";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const UpdateToPHP = () => {
    if (UpdateMyimage.current.files.length > 0) {
      // console.log(UpdateMyimage.current.files);
      var reader = new FileReader();
      reader.onload = function (e) {
        console.log("我是if, 我有上傳照片");
        UpdateAxios(e.target.result, true);
      };
      reader.readAsDataURL(UpdateMyimage.current.files[0]);
    }
    else {
      console.log(UpdateMyimage.current.files);
      UpdateAxios("", false);
    }
  }



  


// 登出系統
  const logoutToPHP = () => {
    Cookies.remove("token");
    console.log("你已成功登出");


    // axios({
    //   url: "http://localhost/Prologin2/public/api/logout",
    //   method: "post",
    //   data: {
    //     token: Cookies.get("token"),
    //   },
    // }
    // )
    // .then(function (response) {
    //   Cookies.remove("token")
    //   console.log(response.data);
    //   // document.getElementById('appledog').src = response.data.src;
    // })
    // .catch(function (error) {
    //   console.error(error);
    // // .then(response => {
    // //   // Cookies.remove('token');
    // //   console.log("你已成功登出");
    // // })
    // // .catch(error => {
    // //   console.error('登出請求失敗', error);
    // });
  }


  // 忘記密碼
  const ForgotToPHP = () => {
    axios({
      url: "http://localhost/Prologin2/public/api/forgot-password",
      method: "post",
      data: {
        email: Forgetemail.current.value,
      }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const url = new URL(window.location.href);
  const paths = url.pathname.split('/').filter(path => path !== '');

  const Valuetoken = paths[0];
  const Valueemail = paths[1];
  console.log(Valueemail);

  // 信箱連結重設密碼
  const ResetToPHP = () => {

    axios({
      url: "http://localhost/Prologin2/public/api/resetpassword",
      method: "post",
      data: {
        // token: Resettoken.current.value,
        // email: Resetemail.current.value,
        token: Valuetoken,
        email: Valueemail,
        password: Resetpassword.current.value,
        password_confirmation: Checkpassword.current.value,
      }
    })
      .then(function (response) {
        console.log(response.data);
        

      })
      .catch(function (error) {
        console.error(error);
      });
  }


  return (
    <div>
      <div>
        搜尋<input name='search' id='searchContent' type='text' ref={Usersearch}></input><p></p>
        <button onClick={searchToPHP}>搜尋</button>
      </div>
      <hr></hr>
      <div>
        註冊名稱:<input name='name' id='registerName' type='text' ref={Myname}></input><p></p>
        註冊帳號:<input name='email' id='registerEmail' type='text' ref={Myemail}></input><p></p>
        註冊密碼:<input name='password' id='registerPassword' type='password' ref={Mypassword}></input><p></p>
        <img src={captchaImageUrl} id='abc' />
        <button onClick={captchaGetImageToPHP}>重新載入驗證碼</button>
        <br></br>
        <input name="rv" type="text" ref={RV} ></input>
        <br></br>
        <button onClick={insertToPHP}>註冊</button>
      </div>
      <hr></hr>
      <div>
        登入帳號:<input name='email' id='loginEmail' type='text' ref={LoginMyemail}></input><p></p>
        登入密碼:<input name='password' id='loginPassword' type='password' ref={LoginMypassword}></input><p></p>
        <img src={captchaImageUrl} id='abc' />
        <button onClick={captchaGetImageToPHP}>重新載入驗證碼</button>
        <br></br>
        <input name="verification_code" type="text" ref={Verification_code} ></input>
        {/* <button onClick={Verification_codeToPHP}>送出</button> */}
        <br></br>
        <button onClick={loginToPHP}>登入</button>
      </div>
      <hr></hr>
      <div>
        <img id='appledog' />
        修改大頭貼:<input name='imageApple' id='updateimage' type='file' ref={UpdateMyimage}></input><p></p>
        修改名稱:<input name='name' id='updatename' type='text' ref={UpdateMyname}></input><p></p>
        修改密碼:<input name='password' id='updatepassword' type='password' ref={UpdateMypassword}></input><p></p>
        <button onClick={UpdateToPHP}>修改</button>
        <hr></hr>
      </div>
      <button onClick={logoutToPHP}>登出</button>
      <hr></hr>
      <div>
        忘記密碼<br></br>
        信箱:<input name='email' id='Forgetemail' type='text' ref={Forgetemail}></input>
        <br></br>
        <button onClick={ForgotToPHP}>送出</button>
      </div>
      <hr></hr>
      <div>
        更改密碼:<input name="password" type="password" ref={Resetpassword}></input>
        <br></br>
        確認密碼<input name='password_confirmation' type='password' ref={Checkpassword}></input>
        <br></br>
        <button onClick={ResetToPHP}>送出</button>
      </div>
    </div>
  );
}

export default Register










