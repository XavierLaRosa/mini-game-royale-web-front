import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static URL = `http://localhost:3000`
  static KEY = ''
  static id: string
  static user: User
  constructor(private http: HttpClient) { }

  loginUser(body: Object): Observable<any> {

    return this.http.post<any>(AppService.URL+`/users/login`, body)
  }

  regsiterUser(body: Object): Observable<any> {
    return this.http.post<any>(AppService.URL+`/users`, body)
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(AppService.URL+`/users/${id}`)
  }

  getUserData(): User{
    return AppService.user
  }

  getUserMatching(keyword: string): Observable<any> {
    return this.http.get<any>(AppService.URL+`/users/contains/${keyword}`)
  }

  sendFriendRequest(id: string) {
    return this.http.put<any>(AppService.URL+`/users/friend-request/sender/${AppService.id}/receiver/${id}`, {})
  }

  confirmFriendRequest(id: string) {
    return this.http.put<any>(AppService.URL+`/users/friend-request/sender/${AppService.id}/receiver/${id}/confirm`, {})
  }

  declineFriendRequest(id: string) {
    return this.http.put<any>(AppService.URL+`/users/friend-request/sender/${AppService.id}/receiver/${id}/decline`, {})
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

  getGame(id: number): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL+`/games/${id}`, {headers})
  }

  sendGameRequest(gid: string, id: string) {
    return this.http.put<any>(AppService.URL+`/users/game-request/game/${gid}/sender/${AppService.id}/receiver/${id}`, {})
  }

  confirmGameRequest(gid: string, id: string) {
    return this.http.put<any>(AppService.URL+`/users/game-confirm/game/${gid}/sender/${AppService.id}/receiver/${id}`, {})
  }
}

export enum Notification {
  TO_GAME = 'TO_GAME',
  FROM_GAME = 'FROM_GAME',
  TO_FRIEND = 'TO_FRIEND',
  FROM_FRIEND = 'FROM_FRIEND',
}

export enum GameState {
  WAITING_ACCEPTANCE = "WAITING_ACCEPTANCE",
  WAITING_TURN = "WAITING_TURN"
}

export class User {
  constructor(
    public _id: string,
    public username: string,
    public friends: Friend[],
    public pending_friends_sent: Friend[],
    public pending_friends_received: Friend[],
    public pending_games_sent: Game[],
    public pending_games_received: Game[],
    public games: Game[]
  ){}
}

export class Game {
  constructor(
    public _id: string,
    public name: string,
    public genre_id: string,
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
    public _id: string,
    public username: string
  ){}
}