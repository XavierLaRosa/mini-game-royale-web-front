import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, User } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { shake } from 'ngx-animate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('error', [
      state('0', style({})),
      state('1', style({})),
      transition('0 => 1', useAnimation(shake)),
    ])
  ]
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''
  animateError = false;

  constructor(private appService: AppService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.username && this.password) {
      var body = {username: this.username, password: this.password}
      this.appService.loginUser(body).subscribe({ // login with user credentials
        next: data => {
          console.log("Login API Success: ", data)
          this.animateError = false;
          AppService.KEY = data.token
          AppService.id = data.user._id
          this.router.navigateByUrl('/home')
        },
        error: error => {
          console.log("Login API Error: ", error)
          this.showInfo("username or password is incorrect")
          this.username = ""
          this.password = ""
          this.animateError = true;
          setTimeout(() => {
            this.animateError = false;
          }, 500);
        }
      })
    } else {
      this.showInfo("username and password required to login")
      this.username = ""
      this.password = ""
      this.animateError = true;
      setTimeout(() => {
        this.animateError = false;
      }, 500);
    }
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
