import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  categories: Array<any> = [];
  selectOption: string = 'Select an option';
  postTitle: string = '';
  permaLink: string = '';
  imgSrc: any = 'assets/placeholder-image.jpg';
  newImg: any = '';

  constructor(private catService:CategoriesService){}

  ngOnInit (): void {
    this.catService.loadData().subscribe(val=>{
      this.categories = val
    })
  }

  submitTitle(){
    this.permaLink = this.postTitle.toLowerCase().replace(/\s+/g,'-')
  }

  uploadImg($event:any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    this.newImg = reader.readAsDataURL($event.target.files[0])
  }

}

//event.target.value - if function was something like submitTitle($event) in the html file