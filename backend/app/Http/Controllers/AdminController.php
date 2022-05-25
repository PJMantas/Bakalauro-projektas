<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
//use DB;

class AdminController extends Controller
{
    public function getUsersList(Request $request){

        $users = User::all();

        return response()->json([
            'message' => 'Naudotojų sąrašas sėkmingai gautas',
            'users' => $users
        ], 200);

    }

    public function addUser(Request $request){

    	$validator = Validator::make($request->all(), [
            
            'username' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'first_name' => 'string|between:2,100',
            'last_name' => 'string|between:2,100',
            'age' => 'numeric',
            'country' => 'string|between:2,100',
            'city' => 'string|between:2,100',
            'group_id' => 'required|numeric',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = new User();

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        $user->email = $request['email'];
        $user->username = $request['username'];
        $user->first_name = $request['first_name'];
        $user->last_name = $request['last_name'];
        $user->password = $request['password'];
        $user->age = $request['age'];
        $user->country = $request['country'];
        $user->city = $request['city'];
        $user->group_id = $request['group_id'];

        $user->save();


        return response()->json([
            'message' => 'Naudotojas sėkmingai sukurtas',
            'user' => $user
        ], 201);
    }

    public function deleteUser(Request $request){
        $validator = Validator::make($request ->all(), [
            'id' => 'required|numeric'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        DB::table('users')->where(
            'id', $request['id'])
            ->delete();
        
        return response()->json(201);
        
    }

    public function adminUpdateUser(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'numeric|required', 
            'first_name' => 'string|between:2,100',
            'last_name' => 'string|between:2,100',
            'group_id' => 'numeric|required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $user = User::find($request['user_id']);

        $user->first_name = $request['first_name'];
        $user->last_name = $request['last_name'];
        $user->age = $request['age'];
        $user->country = $request['country'];
        $user->city = $request['city'];
        $user->group_id = $request['group_id'];

        $user->save();

        return response()->json([
            'message' => 'Naudotojas sėkmingai atnaujintas',
            'user' => $user
            ], 200);
    }

    
}
