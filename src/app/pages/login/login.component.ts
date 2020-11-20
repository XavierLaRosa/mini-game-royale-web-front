import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

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
    console.log("body to send: ", body)
    this.appService.loginUser(body).subscribe({
      next: data => {
        console.log("API Success: ", data)
        this.router.navigateByUrl('/home')
      },
      error: error => {
        console.log("API Error: ", error)
      }
    })
  }
}
