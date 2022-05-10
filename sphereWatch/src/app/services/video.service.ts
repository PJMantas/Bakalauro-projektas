import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getVideoById(id: number) {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/video/get-video/`, {params: {id}});
  }
  getVideosList() {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/video/get-videos-list/`);
  }
  createVideo(formBody) {
    return this.http.post<Video>(`http://127.0.0.1:8000/api/video/create-video/`, formBody );
  }
  deleteVideo(id: number) {
    return this.http.delete<Video>(`http://127.0.0.1:8000/api/video/delete-video/`, {params: {id}});
  }
  updateVideo(formBody) {
    return this.http.post<Video>(`http://127.0.0.1:8000/api/video/update-video/`, formBody );
  }
  getUserVideosList() {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/video/get-user-videos-list/`);
  }
  addVideoView(formBody) {
    return this.http.post<Video>(`http://127.0.0.1:8000/api/video/add-video-view/`, formBody);
  }
  reactToVideo(formBody) {
    return this.http.post<Video>(`http://127.0.0.1:8000/api/video/react-to-video/`, formBody);
  }
  dislikeVideo(formBody) {
    return this.http.post<Video>(`http://127.0.0.1:8000/api/video/dislike-video/`, formBody);
  }

  searchVideo(search: string) {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/video/search-video/`, {params: {search}})
  };
  
  getVideoByGenre(genre: number) {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/video/get-videos-by-genre/`, {params: {genre}});
  }

  getOrderedVideosByGenre(formBody) {
    return this.http.post<Video>(`http://127.0.0.1:8000/api/video/get-ordered-videos-by-genre`, formBody);
  }

  getVideoRecomendations(genre: number, videoId: number) {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/video/get-recomended-videos`, {params: {genre, videoId}});
  }

  getRecomendedGenreVideos() {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/video/get-most-viewed-genre-videos`);
  }

}

