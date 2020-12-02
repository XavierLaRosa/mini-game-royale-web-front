import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppService, Game } from 'src/app/app.service';

@Component({
  selector: 'app-round-categories',
  templateUrl: './round-categories.component.html',
  styleUrls: ['./round-categories.component.css']
})
export class RoundCategoriesComponent implements OnInit {
  faChevronLeft = faChevronLeft
  answer: string
  game: Game
  constructor(public appService: AppService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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

}
