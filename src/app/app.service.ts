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
    GAME = 'GAME',
    TO_FRIEND = 'TO_FRIEND',
    FROM_FRIEND = 'FROM_FRIEND',
}

export class User {
  constructor(
    public _id: number,
    public username: string,
    public friends: {_id: number, username: string}[],
    public pending_friends_sent: {_id: number, username: string}[],
    public pending_friends_received: {_id: number, username: string}[],
    public pending_game_invites: {
      _id: number,
      name: string,
      session_id: number,
      genre_id: number,
      current_turn_id:  {_id: number, username: string},
      player_1_id:  {_id: number, username: string},
      player_2_id:  {_id: number, username: string},
      player_1_points: number,
      player_2_points: number,
      round: number,
      max_round: number
    }[],
    public games: {
      _id: number,
      name: string,
      session_id: number,
      genre_id: number,
      current_turn_id:  {_id: number, username: string},
      player_1_id:  {_id: number, username: string},
      player_2_id:  {_id: number, username: string},
      player_1_points: number,
      player_2_points: number,
      round: number,
      max_round: number
    }[]
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
    public current_turn_id:  {_id: number, username: string},
    public player_1_id:  {_id: number, username: string},
    public player_2_id:  {_id: number, username: string},
    public player_1_points: number,
    public player_2_points: number,
    public round: number,
    public max_round: number
  ){}
}
