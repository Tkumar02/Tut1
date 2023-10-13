import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  addUser(userDetails:any){
    this.afs.collection("users").add(userDetails).then(()=>{
      this.toastr.success('Successfully added user')
    })
  }

  checkUserName(username:string){
    return this.afs.collection('users', ref => ref.where('userName','==',username)).get()
  }
}
