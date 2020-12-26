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

  defaultOrder(games) {
    var sortedArr = []
    for(var i = 0; i<games.length; i++){
      if(games[i].is_done == false && games[i].current_turn_id._id == AppService.id){
        sortedArr.push(games[i])
      }
    }
    for(var i = 0; i<games.length; i++){
      if(games[i].is_done == false && games[i].current_turn_id._id != AppService.id){
        sortedArr.push(games[i])
      }
    }
    for(var i = 0; i<games.length; i++){
      if(games[i].is_done == true){
        sortedArr.push(games[i])
      }
    }
    return sortedArr
  }
}
