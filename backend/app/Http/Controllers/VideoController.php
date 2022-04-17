<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use Validator;
use DB;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function createVideo(Request $request){

    	$validator = Validator::make($request->all(), [
            'title' => 'required|string|between:2,100',
            'video_url' => 'required|file|mimetypes:video/mp4',
            'description' => 'required',
            'genre' => 'required|string|between:2,100',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //$video = Video::create(array_merge($validator->validated()));
        
        $user = auth()->user();

        $video = new Video();

        $video->title = $request['title'];
        //$video->video_url = $request['video_url'];
        if ($request->hasFile('video_url'))
        {
            $path = $request->file('video_url')->store('videos', ['disk' => 'videos']);
            $video->video_url = $path;
        }
        $video->description = $request['description'];
        $video->genre = $request['genre'];
        $video->creator_id = 1;
        //$video->creator_id = $user->id;
        
        $video->save();


        return response()->json([
            'message' => 'Video successfully created',
            'video' => $video,
            'path' => $path
        ], 201);
    }

    public function updateVideo(Request $request){
        $validator = Validator::make($request->all(), [
            'video_id' => 'required|numeric', 
            'title' => 'required|string|between:2,100',
            'video_url' => 'required|string|max:100|unique:videos',
            'description' => 'required',
            'genre' => 'required|string|between:2,100',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $video = Video::find($request['video_id']);

        $video->title = $request['title'];
        $video->video_url = $request['video_url'];
        $video->description = $request['description'];
        $video->genre = $request['genre'];

        $video->save();

        return response()->json([
            'message' => 'Video edited',
            'video' => $video
            ], 201);
    }

    public function getVideoById(Request $request){
    	$validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $video = DB::select('select id, title, video_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where id=' . $request['id'] . ' LIMIT 1');

        return response()->json([
            'message' => 'Retrieved Video ID: ' . $request['id'],
            'video' => $video[0]
        ], 201);
    }

    public function deleteVideo(Request $request){
        $validator = Validator::make($request ->all(), [
            'id' => 'required|numeric'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        DB::table('videos')->where(
            'id', $request['id'])
            ->delete();
        
        return response()->json(200);
        
    }

    public function getVideosList(){
        $videos = DB::select('select id, title, video_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos');

        return response()->json([
            'message' => 'Retrieved Video List',
            'videos' => $videos
        ], 201);
    }

    public function getUserVideosList(){
        $videos = DB::select('select id, title, video_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where creator_id=' . auth()->user()->id);

        return response()->json([
            'message' => 'Retrieved Video List',
            'videos' => $videos
        ], 201);
    }
    
}
