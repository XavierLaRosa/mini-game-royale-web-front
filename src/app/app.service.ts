import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static URL = `http://localhost:3000` //https://shrouded-earth-55441.herokuapp.com
  static KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI1ZmVkOGY0NWM4ZGJjNzU2MTA5YjU5YTciLCJpYXQiOjE2MTAyMzU5Mzh9.nxfEP3FuALveXdfXtORoFs0cTTO-M4wFXseIpeopYYw'
  static id: string = '5fed8f45c8dbc756109b59a7'
  static user: User
  static playerPathTail = ".gif"
  static playerPathTailx2 = " (1).gif"
  static playerPathTailx3 = " (2).gif"
  static playerPathTailx4 = " (3).gif"
  static playerPathIcon = "icon/"
  static playerPathHappy = "happy/"
  static playerPathSad = "sad/"
  static playerPaths = [
    "assets/players/mochi/",
    "assets/players/detective-mochi/",
    "assets/players/pinto-prince/",
    "assets/players/strawberry-queen/",
    "assets/players/waffle/",
  ]
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

  updateUser(body: object): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.put<any>(AppService.URL+`/users/${AppService.id}`, body, {headers})
  }

  getUserData(): User{
    return AppService.user
  }

  getKey(): string {
    return AppService.KEY
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

  unsendFriendRequest(id: string) {
    return this.http.put<any>(AppService.URL+`/users/friend-request/sender/${AppService.id}/receiver/${id}/unsend`, {})
  }

  declineFriendRequest(id: string) {
    return this.http.put<any>(AppService.URL+`/users/friend-request/sender/${AppService.id}/receiver/${id}/decline`, {})
  }
  removeFriend(id: string) {
    return this.http.put<any>(AppService.URL+`/users/friends/sender/${AppService.id}/receiver/${id}/remove`, {})
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

  getGame(id: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL+`/games/${id}`, {headers})
  }

  sendGameRequest(gid: string, id: string) {
    return this.http.put<any>(AppService.URL+`/users/game-request/game/${gid}/sender/${AppService.id}/receiver/${id}`, {})
  }

  confirmGameRequest(gid: string, id: string) {
    return this.http.put<any>(AppService.URL+`/users/game-request/game/${gid}/sender/${AppService.id}/receiver/${id}/confirm`, {})
  }

  declineGameRequest(gid: string, id: string) {
    return this.http.put<any>(AppService.URL+`/users/game-request/game/${gid}/sender/${AppService.id}/receiver/${id}/decline`, {})
  }

  unsendGameRequest(gid: string, id: string) {
    return this.http.put<any>(AppService.URL+`/users/game-request/game/${gid}/sender/${AppService.id}/receiver/${id}/unsend`, {})
  }

  checkCategoryAnswer(id: string, keyword: string, gid: string){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL+`/categories/${id}/submit/${keyword}/game/${gid}`, {headers})
  }

  incrementCategoryGame(id: string, seconds: number){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL+`/games/${id}/seconds-left/${seconds}`, {headers})
  }

  newCategoryEntry(cid: string, entry: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL+`/categories/${cid}/new-entry/${entry}`, {headers})
  }

  postCategory(category: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    const body = {category: category}
    return this.http.post<any>(AppService.URL+`/categories`, body, {headers})
  }

 
  forfeitGame(id: string, pid: string): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL+`/games/${id}/forfeit/${pid}`, {headers})
  }

  getRandomPlayerPath(): string {
    var randomElement = AppService.playerPaths[Math.floor(Math.random() * AppService.playerPaths.length)]
    var player = randomElement.match(new RegExp("players/" + "(.*)" + "/"))[1]
    return randomElement + "happy/"+player+AppService.playerPathTailx2
  }

  getPlayerFromPath(path: string): string {
    return path.match(new RegExp("players/" + "(.*)" + "/"))[1]
  }

  getCategoriesG(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL + `/categoriesG`, {headers})
  }

  postCategoryG(body: Object): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.post<any>(AppService.URL+`/categoriesG`, body, {headers})
  }

  getCategoryG(id: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.get<any>(AppService.URL+`/categoriesG/${id}`, {headers})
  }

  updateCategoryG(id, body: object): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('auth-token', AppService.KEY)
    return this.http.put<any>(AppService.URL+`/categoriesG/${id}`, body, {headers})
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
    public icon: string,
    public gold: number,
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
    public genre_id: {_id: string, category: string},
    public current_turn_id:  Friend,
    public player_1_id:  Friend,
    public player_2_id:  Friend,
    public player_1_points: number,
    public player_2_points: number,
    public round: number,
    public max_round: number,
    public is_done: boolean,
    public is_tie: boolean,
    public winner: Friend,
    public earnings: number
  ){}
}

export class Friend {
  constructor(
    public _id: string,
    public username: string,
    public icon: string
  ){}
}

export class CategoryG {
  constructor(
    public type: string,
    public genre: string,
    public description: string,
    public players: [Player],
    public answers: [Answer],
    public is_done: boolean,
    public is_tie: boolean,
    public round: number,
    public current_player_turn_number: number
  ){}
}

export class Player {
  constructor(
    public number: number,
    public user_id: string,
    public username: string,
    public icon: string,
    public is_winner: boolean,
    public points: number,
    public earnings: number,
    public forfeited: boolean
  ){}
}

export class Answer {
  constructor(
    public entry: string,
    public player: Player,
    public points: number,
    public up_votes: number,
    public down_votes: number,
    public max_votes: number,
    public approved: boolean
  ){}
}