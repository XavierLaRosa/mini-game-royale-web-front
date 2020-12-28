import { Component, OnInit } from '@angular/core';
import { faBackward, faChevronLeft, faCog, faForward, faPauseCircle, faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { AppService, User } from 'src/app/app.service';
import { MusicService } from 'src/app/services/music.service';
import { MatSliderChange } from '@angular/material/slider'
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  faCog = faCog
  faChevronLeft = faChevronLeft
  faPlayCircle = faPlayCircle
  faPauseCircle = faPauseCircle
  faStopCircle = faStopCircle
  faForward = faForward
  faBackward = faBackward
  username: string
  password: string
  password2: string
  isMuted: boolean = false
  images = [
    {name: "mochi", path: "mochi_blush/mochi_blush(x3).png", selected: true},
    {name: "waffle", path: "waffle/waffle(x3).png", selected: false}
  ]
  selectedPlayer = this.images[0]
  constructor(public appService: AppService, public musicService: MusicService) { }

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

  playerSelected(index: number) {
    console.log("image selected: ", this.images[index])
    this.images.forEach(i => {
      i.selected = false
    })
    this.images[index].selected = true
    this.selectedPlayer = this.images[index]
  }

  onInputChange(event: MatSliderChange) {
    console.log(event.value)
    this.musicService.setVolume(event.value)
  }
}