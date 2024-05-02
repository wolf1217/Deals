<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AboutController extends Controller
{
    public function about(Request $request)
    {
        $token = $request->token;
        // 解碼token 拿裡面的id
        $decoded_token = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $token)[1]))));
        $id = $decoded_token->id;
        

        $mypost = DB::table("users")
            ->leftjoin("UserPost", "users.id", "=", "UserPost.UID")
            ->leftjoin("LikeAndDislike", "UserPost.WID", "=", "LikeAndDislike.WID")
            ->where("users.id", $id)
            ->select(
                "users.name",
                "users.email",
                "users.password",
                "UserPost.WID",
                "UserPost.UID",
                "UserPost.InProgress",
                "UserPost.Title",
                "UserPost.Article",
                "UserPost.ItemLink",
                "UserPost.ItemIMG",
                "UserPost.PostTime",
                "UserPost.ChangeTime",
                "UserPost.ConcessionStart",
                "UserPost.ConcessionEnd",
                "UserPost.ReportTimes",
                "UserPost.Hiding",
                "UserPost.location_tag",
                "UserPost.product_tag",
                "LikeAndDislike.GiveLike",
                "LikeAndDislike.GiveDisLike",
            )
            ->get();


        $good = DB::table("users")
            ->leftjoin("UserPost", "users.id", "=", "UserPost.UID")
            ->leftjoin("LikeAndDislike", "UserPost.WID", "=", "LikeAndDislike.WID")
            ->where("users.id", $id)
            ->selectRaw('COALESCE(SUM(GiveLike), "0") as Sumlike')
            ->groupBy('users.id')
            ->get();


        $collect = DB::table("users")
            ->join("SubAndReport", "users.id", "=", "SubAndReport.UID")
            ->join("UserPost", "SubAndReport.TargetWID", "=", "UserPost.WID")
            ->join("LikeAndDislike", "UserPost.WID", "=", "LikeAndDislike.WID")
            ->join("PostMessage", "UserPost.WID", "=", "PostMessage.WID")
            ->select(
                "UserPost.WID",
                "UserPost.UID",
                "UserPost.InProgress",
                "UserPost.Title",
                "UserPost.Article",
                "UserPost.ItemLink",
                "UserPost.ItemIMG",
                "UserPost.PostTime",
                "UserPost.ChangeTime",
                "UserPost.ConcessionStart",
                "UserPost.ConcessionEnd",
                "UserPost.ReportTimes",
                "UserPost.Hiding",
                "UserPost.location_tag",
                "UserPost.product_tag",
                "LikeAndDislike.GiveLike",
                "LikeAndDislike.GiveDisLike",
                "users.name",
                "PostMessage.UID",
                "PostMessage.MSGPost",
                "PostMessage.MSGPostTime"
            )
            ->get();



        $Self_introduction = DB::table("users")->where("users.id", $id)->select("PersonalProfile","image")->get();

        return response()->json([
            "good" => $good,
            "collerct" => $collect,
            "Self_introduction" => $Self_introduction,
            'mypost' => $mypost
        ]);
    }

    public function post(Request $request)
    {
        // 解碼token 拿取裡面的id
        $token = $request->token;
        $decoded_token = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $token)[1]))));
        $id = $decoded_token->id;


        $postmsg = DB::table("users")
            ->join("SubAndReport", "users.id", "=", "SubAndReport.UID")
            ->join("UserPost", "SubAndReport.TargetWID", "=", "UserPost.WID")
            ->join("PostMessage", "UserPost.WID", "=", "PostMessage.WID")
            ->where("users.id", $id)
            ->select(
                "PostMessage.UID",
                "PostMessage.MSGPost",
                "PostMessage.WID",
                "PostMessage.MSGPostTime"
            )
            ->get();


        $mypostmsg = DB::table("users")
            ->join("UserPost", "users.id", "=", "UserPost.UID")
            ->join("PostMessage", "UserPost.WID", "=", "PostMessage.WID")
            ->where("users.id", $id)
            ->select(
                "PostMessage.UID",
                "PostMessage.MSGPost",
                "PostMessage.WID",
                "PostMessage.MSGPostTime"
            )
            ->get();


        return response()->json([
            "postmsg" => $postmsg,
            "mypostmsg" => $mypostmsg,
        ]);

    }


    public function update_item(Request $request)
    {
        
        // 解碼token 拿取裡面的email
        $token = $request->token;
        $decoded_token = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $token)[1]))));
        $email = $decoded_token->email;
        
        
        // 獲得資料庫原始資料
        $original_image = DB::table("users")->select('image')->where('email', '=', $email)->get();
        $original_name = DB::table("users")->select('name')->where('email', '=', $email)->get();
        $original_password = DB::table("users")->select('password')->where('email', '=', $email)->get();
        $PersonalProfile = DB::table("users")->select('PersonalProfile')->where("email", "=", $email)->get();
        $updateData = [];
        
        
        // 判斷使用者修改甚麼欄位
        // 修改使用者照片
        
        if (($request->hasFile('image')) != "" ) {
            $file = $request->file('image');
            $imagedata = base64_encode(file_get_contents($file->getPathname()));
            $updateData['image'] = $imagedata;
        }
        // 修改使用者名稱
        if (($request->name) != "" && ($request->name != $original_name)) {
            $updateData['name'] = $request->name;
        }
        // 修改使用者自我介紹
        if (($request->PersonalProfile) != "" && ($request->PersonalProfile != $PersonalProfile)) {
            $updateData['PersonalProfile'] = $request->PersonalProfile;
        }
        // 修改使用者密碼
        if (($request->password) != "" && ($request->password != $original_password)) {
            $updateData['password'] = Hash::make($request->password);
        }


        // 存入資料庫
        DB::table("users")->where('email', '=', $email)->update($updateData);
        
        return response()->json([
            'message' => 'Item updated successfully',
        ]);
        
    }
}
