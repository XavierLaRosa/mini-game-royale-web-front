import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faBars, faBell, faCog, faComments, faMicrophoneAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AppService, User } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faBell = faBell
  faComments = faComments
  faMicrophoneAlt = faMicrophoneAlt
  faUserPlus = faUserPlus
  faBars = faBars
  faCog = faCog
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

  _opened: boolean = false;
 
  _toggleSidebar() {
    this._opened = !this._opened;
  }

}
