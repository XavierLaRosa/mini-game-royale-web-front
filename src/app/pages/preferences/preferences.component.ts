import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  faCog = faCog
  faChevronLeft = faChevronLeft
  constructor() { }

  ngOnInit(): void {
  }

}
