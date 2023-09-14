import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

// export const authGuard: 
  
//   CanActivateFn = (
//   route: ActivatedRouteSnapshot, 
//   state: RouterStateSnapshot): 
//   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    
//     if(authService.logGuard){
//       console.log('access granted');
//       return true;
//     }
//     else{
//       console.log('access denied');
      
//       return false;
//     }
//   };

export class AuthGuard {

  constructor(private authService: AuthService, private toastr: ToastrService, private router:Router) {} 

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    if(this.authService.logGuard){
      console.log('access granted');
      return true;
    }
    else{
      console.log('access denied');
      this.toastr.error('You do not have access to this page')
      this.router.navigate(['login']);
      return false;
    }
  }
}
  
