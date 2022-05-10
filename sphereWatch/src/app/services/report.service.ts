import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../shared/enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getSystemReport() {
    return this.http.get<any>(`${environment.api}/report/get-system-report/`);
  }

  getUserReport() {
    return this.http.get<any>(`${environment.api}/report/get-user-report/`);
  }
}
