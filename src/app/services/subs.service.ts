import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubsService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  loadSubs(){
    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {data,id}
        })
      })
    )
  }

  deleteSubs(id:any){
    this.afs.doc(`subscribers/${id}`).delete().then(docRef=>{
      this.toastr.success('User successfully deleted')
    })
  }
}
