import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppService, Game, GameState } from 'src/app/app.service';
import { timer } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { GameListItemComponent } from 'src/app/components/game-list-item/game-list-item.component';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { shake } from 'ngx-animate';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-round-categories',
  templateUrl: './round-categories.component.html',
  styleUrls: ['./round-categories.component.css'],
  animations: [
    trigger('shake', [
      state('true', style({ })),
      state('false', style({ })),
      transition('false => true', useAnimation(shake)),
      transition('true => false', useAnimation(shake)),
      transition('false => false', useAnimation(shake)),
      transition('true => true', useAnimation(shake))
    ]),
  ]
})
export class RoundCategoriesComponent implements OnInit {
  isShake: boolean = false
  faChevronLeft = faChevronLeft
  answer: string
  game: Game
  totalTime: number = 0
  seconds: number = 0
  minutes: number = 0
  modalRef: BsModalRef

  constructor(public appService: AppService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

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
    this.isShake = false
    console.log("bool begin: ", this.isShake)
    if(this.answer) {
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
            this.answer = ""
            // TODO: shake input field
            // TODO: toaster pop up notification at top of page and fades away
            this.isShake = true
            this.showInfo(data.message)
          }
        },
        error: error => {
          console.log("API Error: ", error)
        }
      })
    } else {
        // TODO: toaster pop up notification at top of page and fades away
        this.isShake = true
        this.showInfo("input field is empty!")
    }
    console.log("bool end: ", this.isShake)
  }

  giveupClicked() {
    // TODO: modal pop up confirmation
    console.log("data to send: ", this.game)

    console.log("data to send: ", this.game._id, AppService.id)
    this.appService.forfeitGame(this.game._id, AppService.id).subscribe({
      next: data => {
        this.modalRef.hide()
        console.log("Forfeit Game API Success: ", data)
        this.game = data as Game
        this.router.navigate([`results-categories/${this.game._id}`]);
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
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
