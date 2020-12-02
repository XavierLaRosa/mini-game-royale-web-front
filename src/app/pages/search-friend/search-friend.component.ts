import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppService, Friend, User } from 'src/app/app.service';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {
  keyword: string
  faChevronLeft = faChevronLeft
  faSearch = faSearch
  matches: {_id: number, username: string}[]
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({ // get user data
      next: data => {
        console.log("User API Success: ", data)
        AppService.user = data as User
      },
      error: error => {
        console.log("User API Error: ", error)
      }
    })
  }

  searchClicked(){
    this.matches = []
    this.appService.getUserMatching(this.keyword).subscribe({ // get matching users
      next: data => {
        console.log("User Match API Success: ", data)
        data.forEach(d => {
          if(d._id != AppService.id){
            if(this.matches){
              this.matches.push(d as {_id: number, username: string})
            } else {
              this.matches = [d as {_id: number, username: string}]
            }
          }
        })
      },
      error: error => {
        console.log("User Match API Error: ", error)
      }
    })
  }

  addClicked(_id: string){
    this.appService.sendFriendRequest(_id).subscribe({ // send friend request
      next: data => {
        console.log("Send Friend API Success: ", data)
      },
      error: error => {
        console.log("Send Friend API Error: ", error)
      }
    })
  }

}
