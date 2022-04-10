import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<User[]>(`http://127.0.0.1:8000/api/admin/users-list/`);
  }

  addUser(formBody) {
    return this.http.post<User>('http://127.0.0.1:8000/api/admin/add-user/', formBody );
  }
  
  deleteUser(id: number){
    return this.http.post<number>('http://127.0.0.1:8000/api/admin/delete-user/', {"id": `${id}`});
  }

  adminUpdateUser(formBody) {
    return this.http.post<User>('http://127.0.0.1:8000/api/admin/admin-update-user/', formBody );
  }
}
