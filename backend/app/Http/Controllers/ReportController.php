<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use Validator;
use DB;


class ReportController extends Controller
{
    public function createmReport(Request $request){

    	$validator = Validator::make($request->all(), [
            'title' => 'required|string|between:2,100',
            'video_url' => 'required|file|mimetypes:video/mp4',
            'description' => 'required',
            'genre' => 'required|string|between:2,100',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $user = auth()->user();

        $video = new Video();


        $video->description = $request['description'];
        $video->genre = $request['genre'];
        $video->creator_id = 1;
        //$video->creator_id = $user->id;
        
        $video->save();


        return response()->json([
            'message' => 'Video successfully created',
            'video' => $video
        ], 201);
    }

    public function getSystemReport(){
        //$videos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos');
        $usersCount = DB::select('select count(*) as count from users');

        $videoCount = DB::select('select count(*) as count from videos');

        $videoSums = DB::select('select sum(clicks) as clicks, sum(likes) as likes, sum(dislikes) as dislikes from videos');

        $mostLikedVideos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos order by likes desc limit 5');
        
        $mostDislikedVideos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos order by dislikes desc limit 5');
        
        $mostViewedVideos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos order by clicks desc limit 5');

        $commentCount = DB::select('select count(*) as count from comments');

        $mostCommentedVideos = DB::select('select videos.id as video_id, videos.title as title, count(comments.id) as comments from videos
                                        inner join comments on videos.id = comments.video_id 
                                            group by videos.id, videos.title
                                            order by comments desc limit 3');

        return response()->json([
            'message' => 'Retrieved SystemReportValues',
            'RegisteredUsers' => $usersCount,
            'Videos' => $videoCount,
            'VideoSums' => $videoSums,
            'MostLikedVideos' => $mostLikedVideos,
            'MostDislikedVideos' => $mostDislikedVideos,
            'MostViewedVideos' => $mostViewedVideos,
            'MostCommentedVideos' => $mostCommentedVideos,
            'Comments' => $commentCount

        ], 201);
    }

    public function getUserReport(){
        //$videos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos');
        $user = auth()->user();
        //$userid = $user->id;
        $userid = 1;

        $userVideoCount = DB::select('select count(*) as count from videos where creator_id = ?', [$userid]);

        $userVideoSums = DB::select('select sum(clicks) as clicks, sum(likes) as likes, sum(dislikes) as dislikes from videos where creator_id = ?', [$userid]);
     
        $mostCommentedVideos = DB::select('select videos.id as video_id, videos.title as title, count(comments.id) as comments from videos
                                            inner join comments on videos.id = comments.video_id 
                                                where videos.creator_id = ?
                                                group by videos.id, videos.title
                                                order by comments desc limit 3', [$userid]);

        $mostLikedVideos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where creator_id = ? order by likes desc limit 3', [$userid]);

        $mostLikedVideosByDate = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where creator_id = ? order by created_at desc', [$userid]);

        $mostViewedVideos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where creator_id = ? order by clicks desc limit 3', [$userid]);
        
        $mostDislikedVideos = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where creator_id = ? order by dislikes desc limit 3', [$userid]);

        $mostDislikedVideosByDate = DB::select('select id, title, video_url, thumbnail_url, description, clicks, likes, dislikes, genre, creator_id, created_at, updated_at from videos where creator_id = ? order by created_at desc', [$userid]);
        
        $userVideoCommentCount = DB::select('select count(comments.id) as commentCount from videos
                                            inner join comments on videos.id = comments.video_id 
                                                where videos.creator_id = ? ', [$userid]);

        return response()->json([
            'message' => 'Retrieved UserReport',
            'VideoCount' => $userVideoCount,
            'MostCommentedVideos' => $mostCommentedVideos,
            'MostLikedVideos' => $mostLikedVideos,
            'MostViewedVideos' => $mostViewedVideos,
            'VideoSums' => $userVideoSums,
            'MostDislikedVideos' => $mostDislikedVideos,
            'CommentCount' => $userVideoCommentCount,
            'MostLikedVideosByDate' => $mostLikedVideosByDate,
            'MostDislikedVideosByDate' => $mostDislikedVideosByDate
           
        ], 201);
    }

    
}
