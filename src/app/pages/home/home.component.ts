import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDoubleDown, faBars, faBell, faCog, faComments, faMicrophoneAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { bounce } from 'ngx-animate';
import { AppService, User } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))])
  ]
})
export class HomeComponent implements OnInit {
  bounce: any
  faBell = faBell
  faComments = faComments
  faMicrophoneAlt = faMicrophoneAlt
  faUserPlus = faUserPlus
  faBars = faBars
  faCog = faCog
  faSignOutAlt = faSignOutAlt
  faAngleDoubleDown = faAngleDoubleDown
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
