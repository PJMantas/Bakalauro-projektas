import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getPermissionList() {
    return this.http.get<Permission[]>(`${environment.api}/admin/permissions-list/`);
  }

  addPermission(formBody) {
    return this.http.post<Permission>(`${environment.api}/admin/add-permission/`, formBody );
  }

  deletePermission(id: number){
    return this.http.delete<number>(`${environment.api}/admin/delete-permission/`, {params: {id}});
  }

  updatePermission(formBody) {
    return this.http.patch<Permission>(`${environment.api}/admin/update-permission/`, formBody );
  }

  getPermission(id: number){
    return this.http.get<Permission>(`${environment.api}/admin/get-permission/`, {params: {id}});
  }

  getAuthUserPermissions(){
    return this.http.get<Permission>(`${environment.api}/user/get-auth-user-permissions/`);
  }

}
