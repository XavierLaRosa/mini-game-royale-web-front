import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppService, Notification, User } from 'src/app/app.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  keyword: string
  faChevronLeft = faChevronLeft
  notifications: {_id: string, username: string, type: Notification, gid?: string}[]
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({ // get User data
      next: data => {
        console.log("User API Success: ", data)
        AppService.user = data as User
        AppService.user.pending_games_sent.forEach( g => { // add games sent
          if(!this.notifications){
            this.notifications = [{_id: g.player_2_id._id, username: g.player_2_id.username, type: Notification.TO_GAME, gid: g._id}]
          } else{
            this.notifications.push({_id: g.player_2_id._id, username: g.player_2_id.username, type: Notification.TO_GAME, gid: g._id})
          }
        })
        AppService.user.pending_games_received.forEach( g => { // add games received
          if(!this.notifications){
            this.notifications = [{_id: g.player_1_id._id, username: g.player_1_id.username, type: Notification.FROM_GAME, gid: g._id}]
          } else{
            this.notifications.push({_id: g.player_1_id._id, username: g.player_1_id.username, type: Notification.FROM_GAME, gid: g._id})
          }
        })
        AppService.user.pending_friends_sent.forEach(f => { // add friends sent
          if(!this.notifications){
            this.notifications = [{_id: f._id, username: f.username, type: Notification.TO_FRIEND}]
          } else {
            this.notifications.push({_id: f._id, username: f.username, type: Notification.TO_FRIEND})
          }
        })
        AppService.user.pending_friends_received.forEach(f => { // add friends received
          if(!this.notifications){
            this.notifications = [{_id: f._id, username: f.username, type: Notification.FROM_FRIEND}]
          } else {
            this.notifications.push({_id: f._id, username: f.username, type: Notification.FROM_FRIEND})
          }          
        })
      },
      error: error => {
        console.log("User API Error: ", error)
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

  accept(type: string, gid: string, id: string) {
    if(type == Notification.FROM_GAME){
      this.appService.confirmGameRequest(gid, id).subscribe({ // confirm game request
        next: data => {
          console.log("API Success: ", data)
          this.router.navigateByUrl('/home')
        },
        error: error => {
          console.log("Confirm Game API Error: ", error)
        }
      })
    } else if(type == Notification.FROM_FRIEND){
      this.appService.confirmFriendRequest(id).subscribe({ // confirm friend request
        next: data => {
          console.log("Confirm Friend API Success: ", data)
          this.router.navigateByUrl('/home')
        },
        error: error => {
          console.log("Confirm Friend API Error: ", error)
        }
      })
    }
  }

  decline(type: string, gid: string, id: string) {
    if(type == Notification.FROM_GAME){
      this.appService.declineGameRequest(gid, id).subscribe({ // decline game request
        next: data => {
          console.log("Decline Game API Success: ", data)
          this.router.navigateByUrl('/home')
        },
        error: error => {
          console.log("Decline Game API Error: ", error)
        }
      })
    } else if(type == Notification.FROM_FRIEND){
      this.appService.declineFriendRequest(id).subscribe({ // decline friend request
        next: data => {
          console.log("Decline Friend API Success: ", data)
          this.router.navigateByUrl('/home')
        },
        error: error => {
          console.log("Decline Friend API Error: ", error)
        }
      })
    }
  }
}
