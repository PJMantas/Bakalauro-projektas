import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getSystemReport() {
    return this.http.get<any>(`http://127.0.0.1:8000/api/report/get-system-report/`);
  }

  getUserReport() {
    return this.http.get<any>(`http://127.0.0.1:8000/api/report/get-user-report/`);
  }
}
