import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage, 
    private afs: AngularFirestore, 
    private toastr: ToastrService
    ) { }

  uploadPost(selectedImage: any, postData:any) {
    const filePath = `postIMG/${Date.now()}`
    console.log(filePath)
    this.storage.upload(filePath, selectedImage).then(()=>{
      console.log('image uploaded successfully!')

      this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
        postData.postImgPath = URL;
        console.log(postData);
        this.savePost(postData);
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
  }
}
