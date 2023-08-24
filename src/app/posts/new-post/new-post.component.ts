import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

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
  postForm: FormGroup<any>;
  blue: string = ''
  postData: Post = {
    title: '',
    permaLink: '',
    category: {
      categoryId: '',
      category: '',
    },
    excerpt: '',
    content: '',
    isFeatured: false,
    views: 0,
    status: 'new',
    createdAt: new Date()
}

  constructor(private catService:CategoriesService, private fb: FormBuilder, private postService: PostsService){
    this.postForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(10)]],
      permaLink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: [''],
      content: ['', Validators.required]
    })
  }

  ngOnInit (): void {
    this.catService.loadData().subscribe(val=>{
      this.categories = val
    })
  }

  get fc() {
    return this.postForm.controls
  }

  submitTitle(){
    this.permaLink = this.postTitle.toLowerCase().replace(/\s+/g,'-')
  }

  uploadImg($event:any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0])
    this.newImg = $event.target.files[0]
  }

  onSubmit(){

    this.postForm.value.category.split('-');

    console.log(this.postForm.value)
    this.postData.title = this.postForm.value.title,
    this.postData.permaLink = this.postForm.value.permaLink,
    this.postData.postImgPath= this.postForm.value.postImg,
    this.postData.excerpt= this.postForm.value.excerpt,
    this.postData.content= this.postForm.value.content,
    this.postData.category.categoryId = this.postForm.value.category.split('-')[0]
    this.postData.category.category = this.postForm.value.category.split('-')[1]

    console.log(this.postData.category)
    this.postService.uploadPost(this.newImg, this.postData);
    this.postForm.reset();
    this.imgSrc = 'assets/placeholder-image.jpg';
  }

}

//event.target.value - if function was something like submitTitle($event) in the html file