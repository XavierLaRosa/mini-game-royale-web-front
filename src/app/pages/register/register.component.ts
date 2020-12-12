import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = ''
  password: string = ''
  password2: string = ''
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if(this.validate(this.username, this.password, this.password2)) {
      var body = {username: this.username, password: this.password}
      this.appService.regsiterUser(body).subscribe({ // register user with credentials
        next: data => {
          console.log("Register API Success: ", data)
          this.router.navigateByUrl('/')
        },
        error: error => {
          console.log("Register API Error: ", error)
        }
      })
    } else {
      console.log("Unable to create account! Either username already exists or passwords do not match.")
    }
  }

  validate(u: string, p: string, p2: string): boolean {
    return u && (p == p2)
  }
}
