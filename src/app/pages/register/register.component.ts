import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { shake } from 'ngx-animate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('error', [
      state('0', style({})),
      state('1', style({})),
      transition('0 => 1', useAnimation(shake)),
    ])
  ]
})
export class RegisterComponent implements OnInit {
  username: string = ''
  password: string = ''
  password2: string = ''
  animateError = false;

  constructor(private appService: AppService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    if(this.validate(this.username, this.password, this.password2)) {
      var body = {username: this.username, password: this.password}
      this.appService.regsiterUser(body).subscribe({ // register user with credentials
        next: data => {
          console.log("Register API Success: ", data)
          this.showInfo("user has been created, please login")
          this.username = ""
          this.password = ""
          this.password2 = ""
        },
        error: error => {
          console.log("Register API Error: ", error)
          this.showInfo("user may already exist")
          this.username = ""
          this.password = ""
          this.password2 = ""
          this.animateError = true;
          setTimeout(() => {
            this.animateError = false;
          }, 500);
        }
      })
    } else {
      this.showInfo("make sure username exists and passwords match")
      this.username = ""
      this.password = ""
      this.password2 = ""
      this.animateError = true;
      // after animation is done, restore the initial state
      setTimeout(() => {
        this.animateError = false;
      }, 500);
    }
  }

  validate(u: string, p: string, p2: string): boolean {
    return u && (p == p2)
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
