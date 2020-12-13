import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faBell, faCog, faComments, faMicrophoneAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
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
  faSignOutAlt = faSignOutAlt
  constructor(public appService: AppService, private router: Router) { }

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

  logout() {
    AppService.KEY = null
    AppService.id = null
    AppService.user = null
    this.router.navigateByUrl("/")
  }

}
