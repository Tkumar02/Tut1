import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categoryData: any = {}
  subCat: any = {}
  
  constructor( private afs: AngularFirestore ) {}

  onSubmit(form: any){
    this.categoryData.category = form.value.category
    this.categoryData.active = false

    this.subCat.field = 'subCAT1'

    console.log(this.categoryData)

    this.afs.collection('categories').add(this.categoryData).then(docRef=> {
      console.log(docRef.id);
      this.afs.collection('categories').doc(docRef.id).collection('subCategories').add(this.subCat).then(docRef1=>{
        console.log(docRef1);

        this.afs.doc(`categories/${docRef.id}/subCategories/${docRef1.id}`).collection('subsubCategories').add(this.subCat)
      })
    })
    .catch(err => {console.log(err)})
  }

}
