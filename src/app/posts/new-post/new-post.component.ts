import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  categories: Array<any> = [];
  selectOption: string = 'Select an option';
  postTitle: string = '';
  permaLink: string = '';
  imgSrc: any = 'assets/placeholder-image.jpg';
  newImg: any = '';
  postForm!: FormGroup<any>;
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
    createdAt: new Date(),
    user: ''
  }

  editPost: any;
  formStatus: string = 'Add New Post';
  formAction: string = 'Add new post below';
  postID: string = '';
  
  userEmail: string = '';
  status$: Observable<boolean> | undefined
  userName$: Observable<string> | undefined

  constructor(
    private catService:CategoriesService, 
    private fb: FormBuilder, 
    private postService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService
    )

    {

      this.postForm = this.fb.group({
        title: ['',[Validators.required, Validators.minLength(10)]],
        permaLink: ['', Validators.required],
        excerpt: ['', [Validators.required, Validators.minLength(50)]],
        category: ['', Validators.required],
        postImg: [''],
        content: ['', Validators.required]
      })
    
    this.route.queryParams.subscribe(val=>{
      this.postService.loadOneData(val['id']).subscribe(post=>{
        this.postID = val['id'];
        this.editPost = post;
        if(val['id']){
          this.formStatus = 'Edit Post';
          this.formAction = 'Edit post below'
        }
        

        this.postForm = this.fb.group({
          title: [this.editPost.title, [Validators.required, Validators.minLength(5)]],
          permaLink: [this.editPost.permaLink, Validators.required],
          excerpt: [this.editPost.excerpt, [Validators.required, Validators.minLength(15)]],
          category: [`${this.editPost.category.categoryId}-${this.editPost.category.category}`, Validators.required],
          postImg: [''],
          content: [this.editPost.content, [Validators.required, Validators.minLength(50)]],
          user: this.userEmail
        })

        this.imgSrc = this.editPost.postImgPath;
      })
    })
  }

  ngOnInit (): void {
    this.catService.loadData().subscribe(val=>{
      this.categories = val
    })

    let userString = (localStorage.getItem('user')) ?? '{}'
    let user;
    if(userString !== null){
      user = JSON.parse(userString)
      this.status$ = this.authService.logStatus();
      this.authService.userN$.subscribe((userEmail)=>{
      this.userEmail = userEmail;
      })
    }       
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

    //console.log(this.postForm.value)
    this.postData.title = this.postForm.value.title,
    this.postData.permaLink = this.postForm.value.permaLink,
    this.postData.postImgPath= this.postForm.value.postImg,
    this.postData.excerpt= this.postForm.value.excerpt,
    this.postData.content= this.postForm.value.content,
    this.postData.category.categoryId = this.postForm.value.category.split('-')[0]
    this.postData.category.category = this.postForm.value.category.split('-')[1]
    this.postData.user = this.userEmail

    //console.log(this.postData.category)
    this.postService.uploadPost(this.newImg, this.postData, this.formStatus, this.postID);
    this.postForm.reset();
    this.imgSrc = 'assets/placeholder-image.jpg';
  }

}

//event.target.value - if function was something like submitTitle($event) in the html file