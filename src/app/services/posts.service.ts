import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private fStorage: AngularFireStorage, 
    private afs: AngularFirestore, 
    private toastr: ToastrService,
    private router: Router
    ) { }

  uploadPost(selectedImage: any, postData:any, formStatus:string, id:string) {
    const filePath = `postIMG/${Date.now()}`
    console.log(filePath)
    this.fStorage.upload(filePath, selectedImage).then(()=>{
      console.log('image uploaded successfully!')

      this.fStorage.ref(filePath).getDownloadURL().subscribe(URL=>{
        postData.postImgPath = URL;
        console.log(postData);
        if(formStatus=='Edit Post'){
          this.updateData(id, postData)
        } else{
          this.savePost(postData);
        }
        
      })
    })
  }

  savePost(post: any){
    this.afs.collection('posts').add(post).then(docRef=>{
      this.toastr.success('Post uploaded successfully')
    })
    .catch(err=>{
      console.log(err)
    })
    this.router.navigate(['/posts'])
  }

  loadPosts(){
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id,data}
        })
      })
    )
  }

  loadOneData(id:string){
    
    //this.afs.collection('posts').doc(id).valueChanges();
    //below code is the exact same as above code - does the same thing
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: string, postData:any) {
    this.afs.doc(`posts/${id}`).update(postData).then(()=>{
      this.toastr.success('Post updated successfully');
      this.router.navigate(['/posts']);
    })
  }

  deleteImage(postImgPath: any, id:string){
    this.fStorage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deletePost(id)
    })
  }

  deletePost(id: string){
    this.afs.doc(`posts/${id}`).delete().then(docref=>{
      this.toastr.warning('Post deleted')
    })
  }

  markFeatured(id:string, featuredData:object){
    this.afs.doc(`posts/${id}`).update(featuredData).then(()=>{
      this.toastr.info('Featured Status Updated')
    })
  }
}
