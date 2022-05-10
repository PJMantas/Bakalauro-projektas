import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../shared/enviroment/enviroment';
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
    return this.http.post<Genre>(`${environment.api}/genre/delete-genre/`, {"id": `${id}`});
  };

  updateGenre(formbody) {
    return this.http.post<Genre>(`${environment.api}/genre/update-genre/`, formbody);
  };

  getGenre(id: number) {
    return this.http.get<Genre>(`${environment.api}/genre/get-genre/`, {params: {id}});
  };

}
