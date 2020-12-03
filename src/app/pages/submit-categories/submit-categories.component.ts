import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Category } from '../create-categories/create-categories.component';

@Component({
  selector: 'app-submit-categories',
  templateUrl: './submit-categories.component.html',
  styleUrls: ['./submit-categories.component.css']
})
export class SubmitCategoriesComponent implements OnInit {
  keyEntry: string
  keySubmitted: boolean = false
  selectedType: string
  selectedGenre: string
  categories: Category[]
  entry: string
  constructor(public appService: AppService) { }

  ngOnInit(): void {

  }

  submitKey() {
    AppService.KEY = this.keyEntry
    this.appService.getCategories().subscribe({ // get categories option data
      next: data => {
        console.log("Categories option API Success: ", data)
        this.categories = data as Category[]
        this.keySubmitted = true
      },
      error: error => {
        console.log("Categories option API Error: ", error)
      }
    })
  }

  updateType(){

  }

  updateGenre(){

  }
}
