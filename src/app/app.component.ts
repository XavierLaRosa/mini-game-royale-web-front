import { Component } from '@angular/core';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faUserFriends = faUserFriends;
  title = 'mini-game-royale-web-front';
}
