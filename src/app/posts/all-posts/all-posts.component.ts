import { Component, OnInit, Type } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {

  posts: Array<any> = []
  postDate: string = ''

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.postService.loadPosts().subscribe(val=>{
      //console.log(val,'abc')
      this.posts = val
    })
  }

  deletePost(postImgPath: string, id:string){
    this.postService.deleteImage(postImgPath, id)
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
