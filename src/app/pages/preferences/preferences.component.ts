import { Component, OnInit } from '@angular/core';
import { faBackward, faChevronLeft, faCog, faForward, faPauseCircle, faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { AppService, User } from 'src/app/app.service';
import { MusicService } from 'src/app/services/music.service';
import { MatSliderChange } from '@angular/material/slider'
import { ToastrService } from 'ngx-toastr';
import { Howler } from 'howler';

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
  images = []
  selectedPlayer: {name: string, path: string, selected: boolean}
  constructor(public appService: AppService, protected musicService: MusicService, private toastr: ToastrService) { }

  ngOnInit(): void {
    Howler.volume(this.musicService.volume);
    AppService.playerPaths.forEach( p => {
      const player = this.appService.getPlayerFromPath(p)
      this.images.push({
        name: player,
        path: `${p}happy/${player}${AppService.playerPathTailx2}`,
        selected: false
      })
    })
    this.appService.getUser(AppService.id).subscribe({ // get user data
      next: data => {
        console.log("User API Success: ", data)
        AppService.user = data as User
        this.images.forEach( i => {
          if(i.name == AppService.user.icon) {
            this.selectedPlayer = i
          }
        })
      },
      error: error => {
        console.log("User API Error: ", error)
        this.showInfo(`${error.error.message}`)
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

  getMusicService() {
    return this.musicService
  }

  confirm() {
    if(this.password == this.password2){
      const body = {
        username: this.username,
        password: this.password,
        icon: this.selectedPlayer.name
      }

      this.appService.updateUser(body).subscribe({ // get user data
        next: data => {
          console.log("User PUT API Success: ", data)
          AppService.user = data as User
          this.showInfo(`successfully update user account.`)
        },
        error: error => {
          console.log("User PUT API Error: ", error)
          this.showInfo(`${error.error.message}`)
        }
      })
    } else {
      this.showInfo(`if you are trying to set a new password, make sure they match.`)
    }


  }

  showInfo(message: string) {
    this.toastr.info(message, 'Toastr fun!', {
      closeButton: true,
      timeOut: 2500,
      positionClass: "toast-top-center",
      tapToDismiss: true
    });
  }
}