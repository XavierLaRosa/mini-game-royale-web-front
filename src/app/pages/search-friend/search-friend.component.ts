import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faPlusCircle, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AppService, Friend, User } from 'src/app/app.service';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {
  keyword: string
  faChevronLeft = faChevronLeft
  faUsers = faUsers
  faSearch = faSearch
  faPlusCircle = faPlusCircle
  matches: {_id: number, username: string, icon: string}[]
  constructor(public appService: AppService, private toastr: ToastrService) { }

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
            var friendExists = false
            for(var i = 0; i < AppService.user.friends.length; i++){
              if(AppService.user.friends[i]._id == d._id) {
                friendExists = true
                break
              }
            }
            if(!friendExists){
              if(this.matches){
                this.matches.push(d as {_id: number, username: string, icon: string})
              } else {
                this.matches = [d as {_id: number, username: string, icon: string}]
              }
            }
          }
        })
        this.showInfo(`${this.matches.length} players found that contain ${this.keyword}`)
        this.keyword = ""
      },
      error: error => {
        console.log("User Match API Error: ", error)
        this.showInfo(`error: request did not succeed.`)
        this.keyword = ""
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

  showInfo(message: string) {
    this.toastr.info(message, 'Toastr fun!', {
      closeButton: true,
      timeOut: 2500,
      positionClass: "toast-top-center",
      tapToDismiss: true
    });
  }

}
