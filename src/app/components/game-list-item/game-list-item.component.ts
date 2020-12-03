import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, GameState } from 'src/app/app.service';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.css']
})
export class GameListItemComponent implements OnInit {
  @Input() isPendingGames: boolean
  @Input() games
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

}
