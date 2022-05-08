import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getPermissionList() {
    return this.http.get<Permission[]>(`http://127.0.0.1:8000/api/admin/permissions-list/`);
  }

  addPermission(formBody) {
    return this.http.post<Permission>('http://127.0.0.1:8000/api/admin/add-permission/', formBody );
  }

  deletePermission(id: number){
    return this.http.post<number>('http://127.0.0.1:8000/api/admin/delete-permission/', {"id": `${id}`});
  }

  updatePermission(formBody) {
    return this.http.post<Permission>('http://127.0.0.1:8000/api/admin/update-permission/', formBody );
  }

  getPermission(id: number){
    return this.http.get<Permission>('http://127.0.0.1:8000/api/admin/get-permission/', {params: {id}});
  }

  getAuthUserPermissions(){
    return this.http.get<Permission>('http://127.0.0.1:8000/api/user/get-auth-user-permissions/');
  }

}
