<?php

namespace App\Http\Controllers;

require_once "C:/xampp/htdocs/Prologin2/vendor/autoload.php";

use App\Http\Controllers\Controller;
use Fukuball\Jieba\Jieba;
use Fukuball\Jieba\Finalseg;
use Illuminate\Http\Request;
use App\Models\YuenArticle;


Jieba::init();
Finalseg::init();


class SearchController extends Controller
{
    public function search(Request $request)
    {
        
        $seg_list = Jieba::cutForSearch($request->search); #cutForSearch搜索引擎模式
        $searchlist = array();
        //第一個迴圈 我去匹配文章
        foreach ($seg_list as $value) { 
            echo "斷詞: " . $value . "\n";
            $search = YuenArticle::where("Title" ,"like", "%".$value."%" )->get(); 
            //第二個迴圈 匹配到的文章 加入到空陣列
            foreach ($search as $value) { 
                array_push($searchlist, $value);
            }
        }
        $searchlist = array_unique($searchlist);
        echo "下面是回傳";
        echo "\n";

        return response()->json([
            
            'search' => $searchlist,
        ]);
    }
}