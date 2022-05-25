import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
 
  register(formBody): Observable<any> {
    return this.http.post(`${environment.api}/auth/register`, formBody);
  }
  
  signin(user: User): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, user);
  }

  profileUser(): Observable<any> {
    return this.http.get(`${environment.api}/auth/user-profile`);
  }
}