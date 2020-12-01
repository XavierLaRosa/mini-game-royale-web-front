import { Component, OnInit } from '@angular/core';
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
  notifications: {_id: number, username: string, type: Notification}[]
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({
      next: data => {
        console.log("API Success: ", data)
        AppService.user = data as User
        console.log("User data: ", AppService.user)
          AppService.user.pending_games_sent.forEach( g => { // add games sent
            if(!this.notifications){
              this.notifications = [{_id: g.player_1_id._id, username: g.player_1_id.username, type: Notification.TO_GAME}]
            } else{
              this.notifications.push({_id: g.player_1_id._id, username: g.player_1_id.username, type: Notification.TO_GAME})
            }
          })
          AppService.user.pending_games_received.forEach( g => { // add games received
            if(!this.notifications){
              this.notifications = [{_id: g.player_1_id._id, username: g.player_1_id.username, type: Notification.FROM_GAME}]
            } else{
              this.notifications.push({_id: g.player_1_id._id, username: g.player_1_id.username, type: Notification.FROM_GAME})
            }
          })
          AppService.user.pending_friends_sent.forEach(f => { // add sent invites
            if(!this.notifications){
              this.notifications = [{_id: f._id, username: f.username, type: Notification.TO_FRIEND}]
            } else {
              this.notifications.push({_id: f._id, username: f.username, type: Notification.TO_FRIEND})
            }
          })
          AppService.user.pending_friends_received.forEach(f => { // add received invites
            if(!this.notifications){
              this.notifications = [{_id: f._id, username: f.username, type: Notification.FROM_FRIEND}]
            } else {
              this.notifications.push({_id: f._id, username: f.username, type: Notification.FROM_FRIEND})
            }          })
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
        this.appService.confirmFriendRequestSent(_id).subscribe({
          next: data => {
            console.log("API Success: ", data)
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
