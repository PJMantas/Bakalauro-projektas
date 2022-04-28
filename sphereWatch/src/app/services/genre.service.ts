import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenresList() {
    return this.http.get<Genre>(`http://127.0.0.1:8000/api/genre/get-genres-list/`);
  };
  
  createGenre(genre: string) {
    return this.http.post<Genre>(`http://127.0.0.1:8000/api/genre/create-genre/`, {"name": `${genre}`});
  };

  deleteGenre(id: number) {
    return this.http.post<Genre>(`http://127.0.0.1:8000/api/genre/delete-genre/`, {"id": `${id}`});
  };

  updateGenre(formbody) {
    return this.http.post<Genre>(`http://127.0.0.1:8000/api/genre/update-genre/`, formbody);
  };

  getGenre(id: number) {
    return this.http.get<Genre>(`http://127.0.0.1:8000/api/genre/get-genre/`, {params: {id}});
  };

}
