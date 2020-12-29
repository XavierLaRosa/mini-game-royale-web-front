import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faCheckCircle, faChevronLeft, faGamepad, faTimesCircle, faUndo, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { AppService, GameState, Notification, User } from 'src/app/app.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  keyword: string
  faChevronLeft = faChevronLeft
  faBell = faBell
  faGamepad = faGamepad
  faUserFriends = faUserFriends
  faCheckCircle = faCheckCircle
  faTimesCircle = faTimesCircle
  faUndo = faUndo
  totalGames: number = 0
  totalFriends: number = 0
  notifications: {_id: string, username: string, icon: string, type: Notification, gid?: string, message: string}[] = []
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({ // get User data
      next: data => {
        console.log("User API Success: ", data)
        AppService.user = data as User
        AppService.user.pending_games_sent.forEach( g => { // add games sent
          const notif = {
            _id: g.player_2_id._id, 
            username: g.player_2_id.username, 
            icon: g.player_2_id.icon,
            type: Notification.TO_GAME,
            gid: g._id, 
            message: `Waiting on ${g.player_2_id.username} to respond to game request.`
          }
          this.notifications.push(notif)
          this.totalGames++
        })
        AppService.user.pending_games_received.forEach( g => { // add games received
          const notif = {
            _id: g.player_1_id._id, 
            username: g.player_1_id.username,
            icon: g.player_1_id.icon, 
            type: Notification.FROM_GAME, 
            gid: g._id, 
            message: `${g.player_1_id.username} sent you a game request.`
          }
          this.notifications.push(notif)
          this.totalGames++
        })
        AppService.user.pending_friends_sent.forEach(f => { // add friends sent
          const notif = {
            _id: f._id, 
            username: f.username,
            icon: f.icon, 
            type: Notification.TO_FRIEND, 
            message: `Waiting on ${f.username} to respond to friend request.`
          }
          this.notifications.push(notif)
          this.totalFriends++
        })
        AppService.user.pending_friends_received.forEach(f => { // add friends received
          const notif = {
            _id: f._id, 
            username: f.username, 
            icon: f.icon, 
            type: Notification.FROM_FRIEND, 
            message: `${f.username} sent you a friend request.`
          }
          this.notifications.push(notif)  
          this.totalFriends++     
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
          this.router.navigate([`game-waiting/${gid}/${GameState.WAITING_TURN}`])
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

  unsend(type: string, gid: string, id: string) {
    if(type == Notification.TO_GAME){
      this.appService.unsendGameRequest(gid, id).subscribe({ // decline friend request
        next: data => {
          console.log("Unsend Game API Success: ", data)
          this.notifications = []
          this.ngOnInit()
        },
        error: error => {
          console.log("Unsend Game API Error: ", error)
        }
      })
    } else if(type == Notification.TO_FRIEND){
      this.appService.unsendFriendRequest(id).subscribe({ // decline friend request
        next: data => {
          console.log("Unsend Friend API Success: ", data)
          this.notifications = []
          this.ngOnInit()
        },
        error: error => {
          console.log("Unsend Friend API Error: ", error)
        }
      })
    }
  }
}
