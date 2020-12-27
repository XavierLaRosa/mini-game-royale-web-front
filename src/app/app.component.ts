import { Component } from '@angular/core';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faUserFriends = faUserFriends
  title = 'mini-game-royale-web-front'
  sound = new Howl({
    src: ['../assets/mp3/What-if-a-Day-harp/What-if-a-Day.mp3']
  });

 constructor() {
 }

 ngOnInit() {
   // Play the sound.
   //this.sound.play();

   // Change global volume.
   Howler.volume(0.3);
 }
}
