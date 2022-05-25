import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenreRequest } from '../models/genreRequest';

@Injectable({
  providedIn: 'root'
})
export class GenreRequestService {

  constructor(private http: HttpClient) { }

  addGenreRequest(formBody) {
    return this.http.post<GenreRequest>(`${environment.api}/user/add-genre-request/`, formBody );
  };

  getGenreRequestsList() {
    return this.http.get<GenreRequest>(`${environment.api}/admin/genre-requests-list/`);
  };

  deleteGenreRequest(id: number) {
    return this.http.delete<GenreRequest>(`${environment.api}/admin/delete-genre-request/`, {params: {id}});
  };

  approveGenreRequest(id: number) {
    return this.http.patch<GenreRequest>(`${environment.api}/admin/approve-genre-request/`, {"id": `${id}`});
  };

  rejectGenreRequest(id: number) {
    return this.http.patch<GenreRequest>(`${environment.api}/admin/reject-genre-request/`, {"id": `${id}`});
  };

  getUserGenreRequestsList() {
    return this.http.get<GenreRequest>(`${environment.api}/user/get-user-genre-requests-list/`);
  };
  
}
