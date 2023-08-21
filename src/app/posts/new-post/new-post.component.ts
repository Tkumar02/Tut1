import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  categories: Array<any> = []
  selectOption: string = 'Select an option'

  constructor(private catService:CategoriesService){}

  ngOnInit (): void {
    this.catService.loadData().subscribe(val=>{
      this.categories = val
      console.log(this.categories)
    })
  }

}
