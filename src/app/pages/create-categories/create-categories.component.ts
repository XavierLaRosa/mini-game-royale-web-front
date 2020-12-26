import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faGamepad, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppService, Game, GameState, User } from 'src/app/app.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {
  faChevronLeft = faChevronLeft
  faGamepad = faGamepad
  faSearch = faSearch
  keyword: string
  friends: {_id: string, username: string}[]
  friend_id: string
  categories: Category[]
  selectedCategory: string
  selectedRounds: number = 10
  gameSubmission = {
    verified_answers: [
    ],
    name: "categories",
    genre_id: "",
    current_turn_id: "",
    player_1_id: "",
    player_2_id: "",
    max_round: this.selectedRounds
  }
  images = [
    {name: "mochi", path: "mochi.gif", selected: true},
    {name: "waffle", path: "waffle.gif", selected: false}
  ]
  selectedPlayer = this.images[0]
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({ // get user data
      next: data => {
        console.log("User API Success: ", data)
        AppService.user = data as User
        this.friends = JSON.parse(JSON.stringify(AppService.user.friends))
        this.gameSubmission.player_1_id = AppService.user._id
        this.gameSubmission.current_turn_id = AppService.user._id
      },
      error: error => {
        console.log("User API Error: ", error)
      }
    })

    this.appService.getCategories().subscribe({ // get categories option data
      next: data => {
        console.log("Categories API Success: ", data)
        this.categories = data as Category[]
        this.gameSubmission.genre_id = this.categories[0]._id.toString()
      },
      error: error => {
        console.log("Categories API Error: ", error)
      }
    })
  }

  playerSelected(index: number) {
    console.log("image selected: ", this.images[index])
    this.images.forEach(i => {
      i.selected = false
    })
    this.images[index].selected = true
    this.selectedPlayer = this.images[index]
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

  friendSelected(_id: string){
    this.friend_id = _id
    this.gameSubmission.player_2_id = this.friend_id
  }

  updateCategory() {
    this.gameSubmission.genre_id = this.selectedCategory
  }

  updateRounds() {
    this.gameSubmission.max_round = this.selectedRounds
  }

  create() {
    this.appService.postGame(this.gameSubmission).subscribe({ // create game
      next: data => {
        console.log("Create game API Success: ", data)
        const gid = data._id
        this.appService.sendGameRequest(gid, data.player_2_id).subscribe({ // send game request
          next: data => {
            console.log("Game Request API Success: ", data)
            this.router.navigate([`game-waiting/${gid}/${GameState.WAITING_ACCEPTANCE}`]);
          },
          error: error => {
            console.log("Game request API Error: ", error)
          }
        })
      },
      error: error => {
        console.log("Create game API Error: ", error)
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