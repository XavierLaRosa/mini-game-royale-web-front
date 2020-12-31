import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  faChevronLeft = faChevronLeft
  submission: string = ""
  message = `
    Hello mochi :)
    \n
    This gift is my attempt to show how much you mean to me!
    You have gone through so much and came out so strong and 
    caring and a little dorky! Hahaha. 
    Thank you for being you. I love every bit of you.
    Anyways, I hope you like this gift and Merry Christmas 
    baby. 
    \n
    Vaffle
    12.31.2020
  `
  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if(this.submission.toLowerCase().includes("follow") && this.submission.toLowerCase().includes("through") && this.submission.toLowerCase().includes("2020")){
      alert(`You solved the super secret message!!! If you are not my girlfriend than this is very awkward please don't read below.\n${this.message}`)
    }
  }
}
