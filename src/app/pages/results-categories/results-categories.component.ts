import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { AppService, Game, User } from 'src/app/app.service';

@Component({
  selector: 'app-results-categories',
  templateUrl: './results-categories.component.html',
  styleUrls: ['./results-categories.component.css']
})
export class ResultsCategoriesComponent implements OnInit {
  game: Game
  faChevronLeft = faChevronLeft
  faGamepad = faGamepad
  pointsDifference: number
  constructor(public appService: AppService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { // get router data
      let gid = params['gid'];
      this.appService.getGame(gid).subscribe({ // get game data
        next: data => {
          console.log("Game API Success: ", data)
          this.game = data as Game
          this.pointsDifference = this.game.player_1_points - this.game.player_2_points
          if(this.pointsDifference < 0){
            this.pointsDifference*=-1
          }
        },
        error: error => {
          console.log("Game API Error: ", error)
        }
      })
    })
  }

}
