import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppService, Game, GameState } from 'src/app/app.service';
import { timer } from "rxjs";

@Component({
  selector: 'app-round-categories',
  templateUrl: './round-categories.component.html',
  styleUrls: ['./round-categories.component.css']
})
export class RoundCategoriesComponent implements OnInit {
  faChevronLeft = faChevronLeft
  answer: string
  game: Game
  totalTime: number = 0
  seconds: number = 0
  minutes: number = 0
  constructor(public appService: AppService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    timer(0, 1000).subscribe(ellapsedCycles => {
      this.totalTime++
      if(this.seconds < 59){
        this.seconds++
      } else {
        this.seconds = 0
        this.minutes++
      }
    });
    this.activatedRoute.params.subscribe(params => {
      let gid = params['gid'];
      this.appService.getGame(gid).subscribe({
        next: data => {
          console.log("Game API Success: ", data)
          this.game = data as Game
        },
        error: error => {
          console.log("API Error: ", error)
        }
      })
      });
  }

  checkClicked() {
    this.appService.checkCategoryAnswer(this.game.genre_id._id, this.answer, this.game._id).subscribe({
      next: data => {
        console.log("Check API Success: ", data)
        if(data.is_valid == true){
          this.appService.incrementCategoryGame(this.game._id, this.totalTime).subscribe({
            next: data => {
              console.log("Increment API Success: ", data)
              // display points
              if(data.is_done == false){
                this.router.navigate([`game-waiting/${data._id}/${GameState.WAITING_TURN}`]);
              } else {
                this.router.navigate([`results-categories/${data._id}`]);
              }
            },
            error: error => {
              console.log("API Error: ", error)
            }
          })
        } else if(data.is_valid == false){

        }
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }

}
