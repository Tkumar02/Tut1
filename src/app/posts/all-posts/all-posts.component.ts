import { Component, OnInit, Type } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {

  posts: Array<any> = [];
  allPosts: Array<any> = [];
  postDate: string = '';
  postData: Array<any> = [];
  featured: boolean = false;

  userEmail: string = '';
  status$: Observable<boolean> | undefined
  userName$: Observable<string> | undefined

  constructor(private postService: PostsService, private authService: AuthService){}

  ngOnInit(): void {

    let userString = (localStorage.getItem('user')) ?? '{}'
    let user;
    if(userString !== null){
      user = JSON.parse(userString)
      this.status$ = this.authService.logStatus();
      this.authService.userN$.subscribe((userEmail)=>{
      this.userEmail = userEmail;
      })
    }

    this.postService.loadPosts().subscribe(val=>{
      this.allPosts = val
      if(this.userEmail == 'admin@gmail.com'){
        this.posts = this.allPosts
      }
      else{
        this.posts = this.allPosts.filter(post=>post.data.user==this.userEmail)
      }
    })
    
  }

  deletePost(postImgPath: string, id:string){
    this.postService.deleteImage(postImgPath, id)
  }

  markFeatured(id:string, value:boolean){
    const featuredData = {
      isFeatured: value
    }
    this.postService.markFeatured(id,featuredData)
  } 

//the code below does work but it's not perfect as i can't easily get milliseconds included - better to use a pipe!
  changeDate(dateOfPost:number){
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    //this.postDate = dateOfPost.toLocaleDateString('en-GB', options);
    //console.log(this.postDate);
    const newDate = dateOfPost*1000
    return new Date(newDate)
  }
}
