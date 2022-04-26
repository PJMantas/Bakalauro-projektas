import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }


  getUser(id: number) {
    return this.http.get<User>(`http://127.0.0.1:8000/api/user/get-user/`, {params: {id}});
  }

  updateProfile(formBuild) {
  return this.http.post<User>(`http://127.0.0.1:8000/api/user/update-profile/`, formBuild);
  }

  getUserPermissions() {
    return this.http.get<Permission>(`http://127.0.0.1:8000/api/user/get-user-permissions/`);
  }

}
