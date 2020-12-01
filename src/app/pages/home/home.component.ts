import { Component, OnInit } from '@angular/core';
import { faBell, faComments, faMicrophoneAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
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
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUser(AppService.id).subscribe({
      next: data => {
        console.log("API Success: ", data)
        AppService.user = data as User
        console.log("User data: ", AppService.user)
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }

}
