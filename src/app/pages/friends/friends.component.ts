import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AppService, User } from 'src/app/app.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  faUsers = faUsers
  faChevronLeft = faChevronLeft
  faUserPlus = faUserPlus
  friends = []
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getData()
  }

  removeFriend(id: string){
    this.appService.removeFriend(id).subscribe({
      next: data => {
        console.log("Remove friend API Success: ", data)
        this.getData()
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }

  getData(){
    this.appService.getUser(AppService.id).subscribe({ // get User data
      next: data => {
        console.log("User API Success: ", data)
        AppService.user = data as User
        this.friends = [...AppService.user.friends]
        console.log("friends: ", this.friends)
      },
      error: error => {
        console.log("User API Error: ", error)
      }
    })
  }
}
