import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userEmail: string = '';
  status$: Observable<boolean> | undefined
  userName$: Observable<string> | undefined

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    let userString = (localStorage.getItem('user')) ?? '{}'
    let user;
    if(userString !== null){
      user = JSON.parse(userString)
      this.status$ = this.authService.logStatus();
      this.authService.userN$.subscribe((userEmail)=>{
        this.userEmail = userEmail;
      })
      //this.userName$ = this.authService.getUserName();
      //console.log(this.userName$)
      //this.userEmail = user.email
    }
  }

  signOut(){
    this.authService.logOut();
  }
}
