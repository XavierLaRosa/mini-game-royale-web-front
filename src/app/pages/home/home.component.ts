import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDoubleDown, faBars, faBell, faCog, faComments, faMicrophoneAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { bounce, fadeOut, fadeOutUp } from 'ngx-animate';
import { AppService, User } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      params: { timing: 1.5, delay: 1 }}))]),
    trigger('fadeOut', [
      state('0', style({})),
      state('1', style({})),
      transition('0 => 1', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('0 => 1', [
        animate(1000, style({opacity: 0}))
      ])])
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
  animateScrolled = false;
  _opened: boolean = false;

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

  @HostListener('window:scroll', ['$event']) 
  onScrollEvent(event) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // see András Szepesházi's comment below
    console.log("Scroll Event", window.pageYOffset );
    if(window.pageYOffset > 30){
      this.animateScrolled = true;
      setTimeout(() => {
        this.animateScrolled = false;
      }, 500);
    }
  }

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
