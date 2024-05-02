<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class CaptchaServiceController extends Controller
{
    //reloadCaptcha() – 刷新驗證碼或文字。
    public function reloadCaptcha()
    {
        return response()->json([
            'captcha'=> captcha_img(),
        ]);
    }
}