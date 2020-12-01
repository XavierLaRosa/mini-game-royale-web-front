import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppService, User } from 'src/app/app.service';

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
    this.appService.getUser(AppService.id).subscribe({
      next: data => {
        console.log("API Success: ", data)
        AppService.user = data as User
        console.log("User data: ", AppService.user)
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }

  searchClicked(){
    this.appService.getUserMatching(this.keyword).subscribe({
      next: data => {
        console.log("API Success: ", data)
        this.matches = data as {_id: number, username: string}[]
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }

  addClicked(_id: number){
    this.appService.sendFriendRequest(_id).subscribe({
      next: data => {
        console.log("API Success: ", data)
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }

}
