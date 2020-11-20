import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static URL = 'http://localhost:3000'
  static KEY = ''
  static user: User
  constructor(private http: HttpClient) { }

  loginUser(body: Object): Observable<any> {

    return this.http.post<any>(AppService.URL+'/users/login', body)
  }

  regsiterUser(body: Object): Observable<any> {
    return this.http.post<any>(AppService.URL+'/users', body)
  }
}

export class User {
  constructor(
    public _id: number,
    public username: string,
    public friends: string[],
    public pending_friends_sent: string[],
    public pending_friends_received: string[],
    public pending_game_invites: string[],
    public active_games: string[],
    public games: string[]
  ){}
}
