import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.css']
})
export class GameListItemComponent implements OnInit {
  @Input() isPendingGames: boolean
  @Input() games
  constructor() { }

  ngOnInit(): void {
  }

}