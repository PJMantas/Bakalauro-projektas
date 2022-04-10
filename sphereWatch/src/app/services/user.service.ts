import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }


    getUser(id: number) {
      return this.http.get<User>(`http://127.0.0.1:8000/api/user/get-user/`, {params: {id}});
  
   }
}
