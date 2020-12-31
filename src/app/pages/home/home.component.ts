import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDoubleDown, faBars, faBell, faCircle, faCog, faComments, faMicrophoneAlt, faQuestion, faSignOutAlt, faStoreAlt, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { bounce, fadeOut, fadeOutUp } from 'ngx-animate';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService, User } from 'src/app/app.service';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      params: { timing: 1.25, delay: 3.5}}))]),
    trigger('fadeOut', [
      state('0', style({})),
      state('1', style({})),
      transition('0 => 1', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('0 => 1', [
        animate(1000, style({opacity: 0}))
      ])]),
    trigger('notificationBounce', [transition('* => *', useAnimation(bounce, {
      params: { timing: 1.25, delay: 2 }}))])
  ]
})
export class HomeComponent implements OnInit {
  bounce: any
  faCircle = faCircle
  faBell = faBell
  faQuestion = faQuestion
  faStoreAlt = faStoreAlt
  faComments = faComments
  faMicrophoneAlt = faMicrophoneAlt
  faUsers = faUsers
  faUserPlus = faUserPlus
  faBars = faBars
  faCog = faCog
  faSignOutAlt = faSignOutAlt
  faAngleDoubleDown = faAngleDoubleDown
  animateScrolled = false;
  _opened: boolean = false;
  notificationSize: number = 0
  intervalId
  iconPath: string

  constructor(public appService: AppService, private router: Router, private spinner: NgxSpinnerService, protected musicService: MusicService) { }

  ngOnInit(): void {
    console.log("Is playing: ", this.musicService.sound.playing())
    if(!this.musicService.sound.playing()){
      this.musicService.start()
    }
    
     /** spinner starts on init */
     this.spinner.show();
 
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 2000);

    this.intervalId = setInterval( e =>{
      this.appService.getUser(AppService.id).subscribe({ // get user data
        next: data => {
          console.log("User API Success: ", data)
          AppService.user = data as User
          this.notificationSize = 
            AppService.user.pending_friends_received.length +
            AppService.user.pending_friends_sent.length + 
            AppService.user.pending_games_received.length +
            AppService.user.pending_games_sent.length
          if(AppService.user.icon){
            this.iconPath = `assets/players/${AppService.user.icon}/icon/${AppService.user.icon}-icon${AppService.playerPathTail}`
          }
        },
        error: error => {
          console.log("User API Error: ", error)
        }
      })
    }, 2000); 
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

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
