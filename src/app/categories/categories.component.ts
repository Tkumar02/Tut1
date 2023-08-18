import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categoryData: any = {}
  
  constructor() {}

  onSubmit(form: any){
    this.categoryData.category = form.value.category
    console.log(this.categoryData)
  }
}
