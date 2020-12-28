import { Component } from '@angular/core';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {Howl, Howler} from 'howler';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faUserFriends = faUserFriends
  title = 'mini-game-royale-web-front'
  static sound = new Howl({
    src: ['../assets/mp3/What-if-a-Day-harp/What-if-a-Day.mp3']
  });

 constructor(public musicService: MusicService) {
   musicService.start()
 }
}
