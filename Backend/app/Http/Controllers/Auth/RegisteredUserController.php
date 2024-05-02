<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;



class RegisteredUserController extends Controller
{
    
    // 註冊系統 
    public function store(Request $request)
    {
        
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'password' => ['required'],
        ]);

        // 驗證碼圖片解碼
        $encrypter = app(\Illuminate\Contracts\Encryption\Encrypter::class);
        $decryptedString = $encrypter->decrypt($request->captcha, false);
        
        // 驗證碼答案
        $extracted_part = explode('|', $decryptedString)[1];    

        // 輸入格答案
        $RV = $request->rv;
        

        $existingUserEmail = User::where('email', $request->email)->first();

        // 驗證碼核對成功
        if($extracted_part === $RV ){
            // 如果DB存在這筆信箱，去判斷有沒有通過驗證
            if ($existingUserEmail) {
                $hasVerified = User::select("email_verified_at")->where('email', "=", $request->email)->first()->email_verified_at;

                // 沒通過驗證，發信給他
                if ($hasVerified === null) {
                    $existingUserEmail->sendEmailVerificationNotification();
                    return response()->json(['message' => '你已經註冊過此信箱，尚未驗證 -----> 請到信箱點擊驗證']);
                }
                // 有通過驗證，直接回傳'你已經成功註冊，並且通過驗證'
                else{
                    return response()->json([
                        'message' => '你已經成功註冊，並且通過驗證',
                    ]);
                }
            }
            // 如果DB找不到這筆信箱，插入使用者，然後寄驗證信
            else{
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                if ($user) {
                    $user->sendEmailVerificationNotification();
                    return response()->json([
                        "message" => "成功發送郵件驗證通知",
                    ]);
                }
                else {
                    return response()->json([
                        "message" => "發送郵件失敗",
                    ]);
                } 
            }
        } 
        else {
            return response()->json([
                "message" => "驗證失敗"
            ]);
        }
    }


    public function email(Request $request) 
    {
        $email = $request->email;
        // 點擊註冊驗證信將當下時間存入到資料庫
        // Carbon::now(); 系統時間
        $updateData['email_verified_at'] = Carbon::now();
        User::where('email', '=', $email)->update($updateData);
    }
}


