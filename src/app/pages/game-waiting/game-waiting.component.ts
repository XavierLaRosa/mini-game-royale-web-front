import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppService, Friend, Game, User } from 'src/app/app.service';

@Component({
  selector: 'app-game-waiting',
  templateUrl: './game-waiting.component.html',
  styleUrls: ['./game-waiting.component.css']
})
export class GameWaitingComponent implements OnInit {
  faChevronLeft = faChevronLeft
  state: string
  game: Game
  opponent: Friend
  constructor(public appService: AppService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let gid = params['gid'];
      this.state= params['state'];
      console.log("GID", gid)
      this.appService.getGame(gid).subscribe({
        next: data => {
          console.log("API Success: ", data)
          this.game = data as Game
          if(this.game.player_1_id._id == AppService.id){
            this.opponent = this.game.player_2_id
          } else {
            this.opponent = this.game.player_1_id
          }
          console.log("Game data: ", this.game)
        },
        error: error => {
          console.log("API Error: ", error)
        }
      })
      });
  }

}
