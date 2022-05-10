import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../shared/enviroment/enviroment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<User[]>(`${environment.api}/admin/users-list/`);
  }

  addUser(formBody) {
    return this.http.post<User>(`${environment.api}/admin/add-user/`, formBody );
  }
  
  deleteUser(id: number){
    return this.http.post<number>(`${environment.api}/admin/delete-user/`, {"id": `${id}`});
  }

  adminUpdateUser(formBody) {
    return this.http.post<User>(`${environment.api}/admin/admin-update-user/`, formBody );
  }
}
