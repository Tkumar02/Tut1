import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userN$ = this.user.asObservable();
  logGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(email:string, password:string){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef=>{
      this.toastr.success('Successfully Logged in');
      this.loadUser()
      this.user.next(email);

      this.loggedIn.next(true);
      this.logGuard = true;
      //console.log('logGuard from auth.service',this.logGuard);
      this.router.navigate([''])
    }).catch(e=>{
      this.toastr.error(e)
    });
  }

  loadUser(){
    this.afAuth.authState.subscribe(user=>{
      //console.log('loadUser from auth.service after login happens',JSON.parse(JSON.stringify(user)))
      localStorage.setItem('user', JSON.stringify(user));
     
    });
  }

  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toastr.success('You have successfully logged out');
      this.router.navigate(['login']);

      this.loggedIn.next(false);
      this.logGuard = false;
      //console.log('logGUARDDD after logOut on auth.service', this.logGuard);
      
      localStorage.removeItem('user');
    })
  }

  logStatus(){
    return this.loggedIn.asObservable();
  }
}
