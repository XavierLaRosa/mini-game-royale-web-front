import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppService, Friend, Game, GameState, User } from 'src/app/app.service';
import { NgxSpinnerService } from "ngx-spinner";

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
  intervalId
  randomPath = "../../../"
  constructor(public appService: AppService, private activatedRoute: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.randomPath = this.randomPath + this.appService.getRandomPlayerPath()
    this.spinner.show();
    this.activatedRoute.params.subscribe(params => { // get router data
      
      let gid = params['gid'];
      this.state= params['state'];
      this.appService.getGame(gid).subscribe({ // get game data
        next: data => {
          console.log("Waiting response game api: ")
          this.game = data as Game
          if(this.game.player_1_id._id == AppService.id){
            this.opponent = this.game.player_2_id
          } else {
            this.opponent = this.game.player_1_id
          }

          this.intervalId = setInterval( e =>{
            this.appService.getGame(gid).subscribe({ // get interval game data
              next: data => {
                console.log("Waiting turn game api: ")
                if(data.current_turn_id._id == AppService.id && this.state == GameState.WAITING_TURN){
                  this.spinner.hide()
                  this.router.navigate([`round-categories/${gid}`]);
                } else if(data.is_done == true){
                  this.spinner.hide()
                  this.router.navigate([`results-categories/${gid}`]);
                }
              },
              error: error => {
                console.log("Game API Error: ", error)
                this.spinner.hide()
                this.router.navigate([`home`]);
              }
            })
          }, 2000);          
        },
        error: error => {
          console.log("Waiting Game API Error: ", error)
        }
      })
      });
  }



  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
