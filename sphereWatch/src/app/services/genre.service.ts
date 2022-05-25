import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenresList() {
    return this.http.get<Genre>(`${environment.api}/genre/get-genres-list/`);
  };
  
  createGenre(genre: string) {
    return this.http.post<Genre>(`${environment.api}/genre/create-genre/`, {"name": `${genre}`});
  };

  deleteGenre(id: number) {
    return this.http.delete<Genre>(`${environment.api}/genre/delete-genre/`, {params: {id}});
  };

  updateGenre(formbody) {
    return this.http.patch<Genre>(`${environment.api}/genre/update-genre/`, formbody);
  };

  getGenre(id: number) {
    return this.http.get<Genre>(`${environment.api}/genre/get-genre/`, {params: {id}});
  };

}
