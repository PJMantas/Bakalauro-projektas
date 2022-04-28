import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenreRequest } from '../models/genreRequest';

@Injectable({
  providedIn: 'root'
})
export class GenreRequestService {

  constructor(private http: HttpClient) { }

  addGenreRequest(formBody) {
    return this.http.post<GenreRequest>(`http://127.0.0.1:8000/api/user/add-genre-request/`, formBody );
  };

  getGenreRequestsList() {
    return this.http.get<GenreRequest>(`http://127.0.0.1:8000/api/admin/genre-requests-list/`);
  };

  deleteGenreRequest(id: number) {
    return this.http.post<GenreRequest>(`http://127.0.0.1:8000/api/admin/delete-genre-request/`, {"id": `${id}`});
  };

  approveGenreRequest(id: number) {
    return this.http.post<GenreRequest>(`http://127.0.0.1:8000/api/admin/approve-genre-request/`, {"id": `${id}`});
  };

  rejectGenreRequest(id: number) {
    return this.http.post<GenreRequest>(`http://127.0.0.1:8000/api/admin/reject-genre-request/`, {"id": `${id}`});
  };

  getUserGenreRequestsList() {
    return this.http.get<GenreRequest>(`http://127.0.0.1:8000/api/user/get-user-genre-requests-list/`);
  };
  
}
