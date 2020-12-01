import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static URL = `http://localhost:3000`
  static KEY = ''
  static id: number
  static user: User
  constructor(private http: HttpClient) { }

  loginUser(body: Object): Observable<any> {

    return this.http.post<any>(AppService.URL+`/users/login`, body)
  }

  regsiterUser(body: Object): Observable<any> {
    return this.http.post<any>(AppService.URL+`/users`, body)
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(AppService.URL+`/users/${id}`)
  }

  getUserData(): User{
    return AppService.user
  }

  getUserMatching(keyword: string): Observable<any> {
    return this.http.get<any>(AppService.URL+`/users/contains/${keyword}`)
  }

  sendFriendRequest(id: number) {
    return this.http.put<any>(AppService.URL+`/users/friend-request/sender/${AppService.id}/receiver/${id}`, {})
  }

  confirmFriendRequestSent(id: number) {
    return this.http.put<any>(AppService.URL+`/users/friend-request/sender/${AppService.id}/receiver/${id}/confirm`, {})
  }

  getCategories(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL + `/categories`, {headers})
  }

  postSession(body: Object): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.post<any>(AppService.URL+`/sessions`, body, {headers})
  }

  postGame(body: Object): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.post<any>(AppService.URL+`/games`, body, {headers})
  }
}

export enum Notification {
    TO_GAME = 'TO_GAME',
    FROM_GAME = 'TO_GAME',
    TO_FRIEND = 'TO_FRIEND',
    FROM_FRIEND = 'FROM_FRIEND',
}

export class User {
  constructor(
    public _id: number,
    public username: string,
    public friends: Friend[],
    public pending_friends_sent: Friend[],
    public pending_friends_received: Friend[],
    public pending_games_sent: Game[],
    public pending_games_received: Game[],
    public games: Game[]
  ){}
}

export class Session {
  constructor(
    public _id: number,
    public player_1_id: number,
    public player_2_id: number,
    public player_1_wins: number,
    public player_2_wins: number
  ){}
}

export class Game {
  constructor(
    public _id: number,
    public name: string,
    public session_id: number,
    public genre_id: number,
    public current_turn_id:  Friend,
    public player_1_id:  Friend,
    public player_2_id:  Friend,
    public player_1_points: number,
    public player_2_points: number,
    public round: number,
    public max_round: number,
    public active: boolean
  ){}
}

export class Friend {
  constructor(
    public _id: number,
    public username: string
  ){}
}