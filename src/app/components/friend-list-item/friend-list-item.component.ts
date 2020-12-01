import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.css']
})
export class FriendListItemComponent implements OnInit {

  @Input() type: string
  @Input() friends

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  removeFriend(id: string){
    this.appService.removeFriend(id).subscribe({
      next: data => {
        console.log("Remove friend API Success: ", data)
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }
}
