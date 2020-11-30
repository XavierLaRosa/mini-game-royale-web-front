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
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({
      next: data => {
        console.log("API Success: ", data)
        AppService.user = data as User
        console.log("User data: ", AppService.user)
        this.friends = JSON.parse(JSON.stringify(AppService.user.friends))
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
}
