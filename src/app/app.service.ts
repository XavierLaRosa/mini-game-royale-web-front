import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static URL = 'http://localhost:3000'
  static CORS = 'https://cors-anywhere.herokuapp.com/'
  static KEY = ''
  headers = new HttpHeaders({"Access-Control-Allow-Origin": "*"})
  constructor(private http: HttpClient) { }

  loginUser(body: Object): Observable<any> {

    return this.http.post<any>(AppService.URL+'/users/login', body)
  }

  regsiterUser(body: Object): Observable<any> {
    return this.http.post<any>(AppService.URL+'/users', body)
  }
}
