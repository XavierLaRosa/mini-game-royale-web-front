import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { AppService, GameState } from 'src/app/app.service';

@Component({
  selector: 'app-choose-character',
  templateUrl: './choose-character.component.html',
  styleUrls: ['./choose-character.component.css']
})
export class ChooseCharacterComponent implements OnInit {
  faChevronLeft = faChevronLeft
  faGamepad = faGamepad
  images = [
    {name: "mochi", path: "mochi.gif", selected: true},
    {name: "waffle", path: "waffle.gif", selected: false}
  ]
  selectedPlayer = this.images[0]
  gid: string
  id: string

  constructor(public appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { // get router data
      this.gid = params['gid'];
      this.id = params['id'];
      console.log("ids: ", this.gid, this.id)
    })
  }

  playerSelected(index: number) {
    console.log("image selected: ", this.images[index])
    this.images.forEach(i => {
      i.selected = false
    })
    this.images[index].selected = true
    this.selectedPlayer = this.images[index]
  }

  confirm() {
    this.appService.confirmGameRequest(this.gid, this.id).subscribe({ // confirm game request
      next: data => {
        console.log("API Success: ", data)
        this.router.navigate([`game-waiting/${this.gid}/${GameState.WAITING_TURN}`]);
      },
      error: error => {
        console.log("Confirm Game API Error: ", error)
      }
    })
  }
}