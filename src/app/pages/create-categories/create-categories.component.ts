import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppService, User } from 'src/app/app.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {
  sessionSubmission = {
    player_1_id: 0,
    player_2_id: 0
  }
  faChevronLeft = faChevronLeft
  faSearch = faSearch
  keyword: string
  friends: {_id: number, username: string}[]
  friend_id: number
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({
      next: data => {
        console.log("API Success: ", data)
        AppService.user = data as User
        console.log("User data: ", AppService.user)
        this.friends = JSON.parse(JSON.stringify(AppService.user.friends))
        this.sessionSubmission.player_1_id = AppService.user._id
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
  }
}
