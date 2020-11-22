import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.css']
})
export class FriendListItemComponent implements OnInit {

  @Input() type: string
  @Input() friends

  constructor() { }

  ngOnInit(): void {
  }

}
