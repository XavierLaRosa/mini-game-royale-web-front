import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, User } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    var body = {username: this.username, password: this.password}
    this.appService.loginUser(body).subscribe({ // login with user credentials
      next: data => {
        console.log("Login API Success: ", data)
        AppService.KEY = data.token
        AppService.id = data.user._id
        this.router.navigateByUrl('/home')
      },
      error: error => {
        console.log("Login API Error: ", error)
      }
    })
  }
}
