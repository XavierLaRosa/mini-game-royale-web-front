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
