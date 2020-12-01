import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppService, User } from 'src/app/app.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {
  faChevronLeft = faChevronLeft
  faSearch = faSearch
  keyword: string
  friends: {_id: number, username: string}[]
  friend_id: number
  categories: Category[]
  selectedCategory: string
  selectedRounds: number = 10
  sessionSubmission = {
    player_1_id: 0,
    player_2_id: 0
  }
  gameSubmission = {
    verified_answers: [
    ],
    name: "categories",
    session_id: "",
    genre_id: "",
    current_turn_id: 0,
    player_1_id: 0,
    player_2_id: 0,
    max_round: this.selectedRounds
  }
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({
      next: data => {
        console.log("API Success: ", data)
        AppService.user = data as User
        console.log("User data: ", AppService.user)
        this.friends = JSON.parse(JSON.stringify(AppService.user.friends))
        this.sessionSubmission.player_1_id = AppService.user._id
        this.gameSubmission.player_1_id = AppService.user._id
        this.gameSubmission.current_turn_id = AppService.user._id
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })

    this.appService.getCategories().subscribe({
      next: data => {
        console.log("Cat API Success: ", data)
        this.categories = data as Category[]
        this.gameSubmission.genre_id = this.categories[0]._id.toString()
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }

  filterFriends() {
    if(this.keyword != ''){
      var temp = []
      this.friends = JSON.parse(JSON.stringify(AppService.user.friends))
      this.friends.forEach( f => {
        if(f.username.includes(this.keyword)){
          temp.push(f)
        }
      })
      this.friends = JSON.parse(JSON.stringify(temp))
    } else {
      this.friends = JSON.parse(JSON.stringify(AppService.user.friends))
    }
  }

  friendSelected(_id: number){
    this.friend_id = _id
    this.sessionSubmission.player_2_id = this.friend_id
    this.gameSubmission.player_2_id = this.friend_id
  }

  updateCategory() {
    console.log("detected change", this.selectedCategory)
    this.gameSubmission.genre_id = this.selectedCategory
  }

  updateRounds() {
    console.log("detected change", this.selectedRounds)
    this.gameSubmission.max_round = this.selectedRounds
  }

  create() {
    console.log("session: ", this.sessionSubmission)
    console.log("game: ", this.gameSubmission)

    this.appService.postSession(this.sessionSubmission).subscribe({
      next: data => {
        console.log("Session API Success: ", data)
        this.gameSubmission.session_id = data._id
        this.appService.postGame(this.gameSubmission).subscribe({
          next: data => {
            console.log("Game API Success: ", data)
            
          },
          error: error => {
            console.log("API Error: ", error)
          }
        })
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }
}
 export class Category {
   constructor(
    public _id: number,
    public category: string,
    public answers: string[]
   ){}
 }