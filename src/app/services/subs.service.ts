import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsService {

  constructor(private afs: AngularFirestore) { }

  loadSubs(){
    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data()
          return data
        })
      })
    )
  }
}
