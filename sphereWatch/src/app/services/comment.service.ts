import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(formBody) {
    return this.http.post<Comment>(`http://127.0.0.1:8000/api/comment/create-comment/`, formBody );
  };

  createCommentReply(formBody) {
    return this.http.post<Comment>(`http://127.0.0.1:8000/api/comment/create-comment-reply/`, formBody );
  };

  getCommentsList(video_id: number) {
    return this.http.get<Comment>(`http://127.0.0.1:8000/api/comment/get-video-comments/`, {params: {video_id}});
  };

  deleteComment(id: number) {
    return this.http.post<Comment>(`http://127.0.0.1:8000/api/comment/delete-comment/`, {"id": `${id}`});
  };

  editComment(formBody) {
    return this.http.post<Comment>(`http://127.0.0.1:8000/api/comment/edit-comment/`, formBody );
  };

}
