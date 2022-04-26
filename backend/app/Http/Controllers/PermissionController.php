<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Permission;
use Validator;
use DB;

class PermissionController extends Controller
{
    public function getAuthUserPermissions(){
        $user = auth()->user();
        //$userGroup = $user->group_id;
        
        $permissions = new Permission();

        $userGroup = 4;

        $permissions = DB::select('select * from permissions where id = ?', [$userGroup]);

        return response()->json([
            'message' => 'Permissions successfully fetched',
            'permissions' => $permissions
        ], 200);
    }

    public function getPermissionsList(){

        $permissions = new Permission();

        $permissions = DB::select('select * from permissions');

        return response()->json([
            'message' => 'Permissions successfully fetched',
            'permissions' => $permissions
        ], 200);
    }

    public function getPermission(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $permission = new Permission();

        $permission = DB::select('select * from permissions where id = ?', [$request['id']]);

        return response()->json([
            'message' => 'Permission successfully fetched',
            'permission' => $permission[0]
        ], 200);
    }

    public function addPermission(Request $request){
        $validator = Validator::make($request->all(), [
            'group_name' => 'required|string|between:2,100',
            'video_create' => 'required|boolean',
            'video_edit' => 'required|boolean',
            'video_delete' => 'required|boolean',

            'reaction_create' => 'required|boolean',
            'comment_create' => 'required|boolean',
            'comment_edit' => 'required|boolean',
            'comment_delete' => 'required|boolean',

            // admin-only permissions
            'is_admin' => 'required|boolean',
            'user_create' => 'required|boolean',
            'user_edit' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $permission = new Permission();

        $permission->group_name = $request['group_name'];
        $permission->video_create = $request['video_create'];
        $permission->video_edit = $request['video_edit'];
        $permission->video_delete = $request['video_delete'];

        $permission->reaction_create = $request['reaction_create'];
        $permission->comment_create = $request['comment_create'];
        $permission->comment_edit = $request['comment_edit'];
        $permission->comment_delete = $request['comment_delete'];

        // admin-only permissions
        $permission->is_admin = $request['is_admin'];
        $permission->user_create = $request['user_create'];
        $permission->user_edit = $request['user_edit'];

        $permission->save();

        return response()->json([
            'message' => 'Permission successfully added',
            'permission' => $permission
        ], 201);

    }

    public function updatePermission(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'group_name' => 'required|string|between:2,100',
            'video_create' => 'required|boolean',
            'video_edit' => 'required|boolean',
            'video_delete' => 'required|boolean',

            'reaction_create' => 'required|boolean',
            'comment_create' => 'required|boolean',
            'comment_edit' => 'required|boolean',
            'comment_delete' => 'required|boolean',

            // admin-only permissions
            'is_admin' => 'required|boolean',
            'user_create' => 'required|boolean',
            'user_edit' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $permission = new Permission();

        $permission = Permission::find($request['id']);

        if(!$permission){
            return response()->json([
                'message' => 'Permission not found'
            ], 404);
        }
        
        $permission->group_name = $request['group_name'];
        $permission->video_create = $request['video_create'];
        $permission->video_edit = $request['video_edit'];
        $permission->video_delete = $request['video_delete'];

        $permission->reaction_create = $request['reaction_create'];
        $permission->comment_create = $request['comment_create'];
        $permission->comment_edit = $request['comment_edit'];
        $permission->comment_delete = $request['comment_delete'];
        

        // admin-only permissions
        $permission->is_admin = $request['is_admin'];
        $permission->user_create = $request['user_create'];
        $permission->user_edit = $request['user_edit'];

        $permission->save();

        return response()->json([
            'message' => 'Permission successfully edited',
            'permission' => $permission
        ], 200);
    }

    public function deletePermission(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $permission = new Permission();

        DB::table('permissions')->where(
            'id', $request['id'])
            ->delete();

        return response()->json([
            'message' => 'Permission successfully deleted',
            'permission' => $permission
        ], 200);
    }
    
}
