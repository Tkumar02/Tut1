import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {
  categoryData: Category = {};
  categoriesArray: Array<any> = [];
  formCategory: string = '';
  formStatus: string = 'Add';
  categoryID: string = '';
  
  constructor( private categoryService: CategoriesService ) {}

  ngOnInit(): void{
    this.categoryService.loadData().subscribe(val=>{
      //console.log(val);
      this.categoriesArray = val;
    })
  }

  onSubmit(form: any){
    this.categoryData = form.value
    if(this.formStatus == 'Add'){
    this.categoryService.saveData(this.categoryData);
    form.reset()
    }
    else if(this.formStatus=='Edit'){
      this.categoryService.updateData(this.categoryID, this.categoryData)
      form.reset()
      this.formStatus = 'Add'
    }
  }

  updateCategory(cat:any, id:string) {
    this.formCategory = cat
    this.formStatus = 'Edit'
    this.categoryID = id
    console.log(cat, id, this.formStatus)
  }

  deleteCategory(id:string){
    this.categoryService.deleteData(id)
  }

}
