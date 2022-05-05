<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\Reaction;
use App\Models\User;
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
            'genre' => 'required|numeric',
            'thumbnail_url' => 'file|mimes:jpg,png,jpeg,gif,svg|max:5120',
            
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

        if ($request->hasFile('thumbnail_url'))
        {
            $path = $request->file('thumbnail_url')->store('thumbnails', ['disk' => 'thumbnails']);
            $video->thumbnail_url = $path;
        }

        $video->description = $request['description'];
        $video->genre = $request['genre'];
        $video->creator_id = $user->id;
        
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
            'description' => 'required',
            'genre' => 'required|numeric',
            'thumbnail_url' => 'file|mimes:jpg,png,jpeg,gif,svg|max:5120',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $video = Video::find($request['video_id']);

        $video->title = $request['title'];
        $video->description = $request['description'];
        $video->genre = $request['genre'];

        if ($request->hasFile('thumbnail_url'))
        {
            $path = $request->file('thumbnail_url')->store('thumbnails', ['disk' => 'thumbnails']);
            $video->thumbnail_url = $path;
        }

        $video->save();

        return response()->json([
            'message' => 'Video edited',
            'video' => $video
            ], 201);
    }

    public function addVideoView(Request $request){
        $validator = Validator::make($request->all(), [
            'video_id' => 'required|numeric', 
            'genre' => 'numeric',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $video = Video::find($request['video_id']);

        $video->increment('clicks');

        $video->save();

        return response()->json([
            'message' => 'Video count added',
            'video' => $video
            ], 201);
    }

    public function reactToVideo(Request $request){
        $validator = Validator::make($request->all(), [
            'video_id' => 'required|numeric', 
            'reaction_type' => 'required|string|in:true,false',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $video = Video::find($request['video_id']);
        $isLiked = $request['reaction_type'] === 'true';
        $user = auth()->user();

        $like = Reaction::where('user_id', $user->id)->where('video_id', $video->id)->first();

        if($like){
            if($like->reaction_type == $isLiked){
                if ($isLiked) {           
                    $like->delete();
                    $video->decrement('likes');
                } else {
                    $video->decrement('dislikes');
                    $like->delete();
                }
            } 
            else {
                if ($isLiked) {
                    $like->reaction_type = $isLiked;
                    $like->save();
                    $video->increment('likes');
                    $video->decrement('dislikes');
                }
                else {
                    $like->reaction_type = $isLiked;
                    $like->save();
                    $video->increment('dislikes');
                    $video->decrement('likes');
                }
            }
        }
        else
        {
            $reaction = new Reaction();
            $reaction->user_id = $user->id;
            $reaction->video_id = $video->id;
            $reaction->reaction_type = $isLiked;
            $reaction->save();

            if ($isLiked)
            {
                $video->increment('likes');
            }
            else
            {
                $video->increment('dislikes');
            }
        }

        $video->save();

        if ($isLiked) {
            return response()->json([
                'message' => 'Video liked',
                'video' => $video
            ], 201);
        }
        else{
            return response()->json([
                'message' => 'Video disliked',
                'video' => $video
            ], 201);
        }
      
        
    }


    public function getVideoById(Request $request){
    	$validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $video = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where id=' . $request['id'] . ' LIMIT 1');

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
        $videos = DB::select('select * from videos');

        return response()->json([
            'message' => 'Retrieved Video List',
            'videos' => $videos
        ], 200);
    }

    public function getUserVideosList(){
        $videos = DB::select('select * from videos where creator_id=' . auth()->user()->id);
        //$videos = DB::select('select id, title, video_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where creator_id= 1');
        
        return response()->json([
            'message' => 'Retrieved Video List',
            'videos' => $videos
        ], 200);
    }

    public function searchVideos(Request $request){
        $validator = Validator::make($request->all(), [
            'search' => 'between:0,100'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $videos = DB::select('select * from videos where title like "%' . $request['search'] . '%"');

        return response()->json([
            'message' => 'Retrieved Video List',
            'videos' => $videos
        ], 201);
    }

    public function getOrderedVideosByGenre(Request $request){
        $validator = Validator::make($request->all(), [
            'genre' => 'required|numeric',
            'orderField' => 'required|string|between:2,100',
            'orderType' => 'required|string|between:2,100'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        if ($request['genre'] != -1)
        {
            $videos = DB::select('select * from videos where genre=' . $request['genre'] . ' order by ' . $request['orderField'] . ' ' . $request['orderType']);
        }
        else
        {
            $videos = DB::select('select * from videos order by ' . $request['orderField'] . ' ' . $request['orderType']);
        }

        return response()->json([
            'message' => 'Retrieved Video List',
            'videos' => $videos
        ], 201);
    }

    public function getVideosByGenre(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'genre' => 'required|numeric'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $videos = DB::select('select * from videos where genre="' . $request['genre'] . '"');

        return response()->json([
            'message' => 'Retrieved Video List',
            'videos' => $videos
        ], 201);
    }
    
}
