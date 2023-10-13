import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

export function passwordsMatchValidator(): ValidatorFn {
  return(control:AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password && confirmPassword && password!== confirmPassword){
      return {
        passwordDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
    }, 
    { validators: passwordsMatchValidator()}
  );

  incorrectPassword: boolean = true
  oPassword: string = '';
  cPassword: string = '';
  eMail: string = ''

  constructor(private authService: AuthService) {}

  ngOnInit(): void{}

  get name() {
    return this.signUpForm.get('name')
  }

  get email() {
    return this.signUpForm.get('email')
  }

  get password() {
    return this.signUpForm.get('password')
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword')
  }

  checkPassword(a:string, b:string){
    if(a!==b){
      this.incorrectPassword = true
    }
    else[
      this.incorrectPassword = false
    ]
  }

  onSubmit(password:string, email:string){
    console.log('SUBMITTED!')
    this.authService.signUp(email, password)
  }
}


