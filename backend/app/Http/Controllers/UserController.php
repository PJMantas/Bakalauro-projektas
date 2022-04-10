<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use DB;

class UserController extends Controller
{
    

    public function getUserById(Request $request){
    	$validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = DB::select('select id, username, email, first_name, last_name, age, city, country, group_id from users where id=' . $request['id'] . ' LIMIT 1');

        return response()->json([
            'message' => 'Retrieved User ID: ' . $request['id'],
            'user' => $user[0]
        ], 201);
    }
}
