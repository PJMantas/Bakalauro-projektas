<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Validator;
use DB;
use File;

class UserController extends Controller
{
    
    
    public function getUserById(Request $request){
    	$validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = DB::select('select id, username, email, first_name, last_name, age, city, country, group_id, avatar_url from users where id=' . $request['id'] . ' LIMIT 1');

        return response()->json([
            'message' => 'Retrieved User ID: ' . $request['id'],
            'user' => $user[0]
        ], 201);
    }

    public function updateProfile(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric', 
            'first_name' => 'string|between:2,100',
            'last_name' => 'string|between:2,100',
            'age' => 'numeric',
            'country' => 'string|between:2,100',
            'city' => 'string|between:2,100',
            'avatar_url' => 'file|mimes:jpg,png,jpeg,gif,svg|max:5120',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($request['user_id']);

        $user->first_name = $request['first_name'];
        $user->last_name = $request['last_name'];
        $user->age = $request['age'];
        $user->country = $request['country'];
        $user->city = $request['city'];
        $user->group_id = $request['group_id'];
        $oldPath = "";
        
        if ($request->hasFile('avatar_url'))
        {
            
            $oldPath = public_path().'/'.$user->avatar_url;
            //Storage::disk('users')->delete(public_path().'/'.$user->avatar_url);
            File::delete($oldPath);

            $path = $request->file('avatar_url')->store('users', ['disk' => 'users']);
            $user->avatar_url = $path;
        }

        $user->save();

        return response()->json([
            'message' => 'User edited',
            'user' => $user,
            'old_image' => $oldPath
            ], 201);
    }
}
