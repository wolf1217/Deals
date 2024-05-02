<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    public function index(Request $request)
    {
        $images = DB::table("carousel")
                    ->select('image as image_url', 'keyword')
                    ->get();
        
        return response()->json([
            'aa' => $images,
        ]);
    }
}