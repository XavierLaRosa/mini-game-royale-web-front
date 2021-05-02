import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppService, CategoryG, Game, GameState, Player } from 'src/app/app.service';
import { timer } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { GameListItemComponent } from 'src/app/components/game-list-item/game-list-item.component';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { shake } from 'ngx-animate';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
  animations: [
    trigger('error', [
      state('0', style({})),
      state('1', style({})),
      transition('0 => 1', useAnimation(shake)),
    ])
  ]
})
export class CategoriesPageComponent implements OnInit {
  animateError = false;
  faChevronLeft = faChevronLeft
  answer: string
  game: CategoryG
  totalTime: number = 0
  seconds: number = 0
  minutes: number = 0
  modalRef: BsModalRef
  intervalId
  gid = null
  state = null
  randomPath = "../../../"

  constructor(public appService: AppService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.randomPath = this.randomPath + this.appService.getRandomPlayerPath()

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
      this.gid = params['gid'];
    });

    this.intervalId = setInterval( e =>{
      this.appService.getCategoryG(this.gid).subscribe({
        next: data => {
          console.log("Category Game API Success: ", data)
          this.game = data as CategoryG
          this.state = this.getState()
        },
        error: error => {
          console.log("API Error: ", error)
        }
      })
    }, 2000);  
  }

  getState(): string {
    if(this.game.is_done || this.game.is_tie){
      return "DONE"
    }
    let thisPlayer = null
    const id = AppService.id
    this.game.players.forEach(p => {
      if(p.user_id === id){
        console.log("found")
        thisPlayer = {...p}
      }
    })
    if(thisPlayer && thisPlayer.number == this.game.current_player_turn_number){
      console.log("returning turn")
      return "TURN"
    }
    return "WAITING"
  }

  showInfo(message: string) {
    this.toastr.info(message, 'Toastr fun!', {
      closeButton: true,
      timeOut: 2500,
      positionClass: "toast-top-center",
      tapToDismiss: true
    });
  }

  getLeaderboard(): Player[] {
    return this.game.players.sort((p1, p2) => p1.points < p2.points ? -1 : p1.points > p2.points ? 1 : 0)

  }

}
