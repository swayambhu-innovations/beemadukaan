import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, WriteBatch ,DocumentReference, CollectionReference , collection , setDoc, doc, updateDoc, deleteDoc, docSnapshots,onSnapshot, docData, getDoc, writeBatch } from '@angular/fire/firestore';
import { getDocs, query } from 'firebase/firestore';
import { PolicyData, PostComment } from '../structures/method.structure';
import { ContactRequest } from '../structures/user.structure';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { uploadBytes,getDownloadURL, deleteObject,StorageReference,getBlob , Storage, ref, uploadBytesResumable, percentage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  contactDoc:CollectionReference;
  usersDoc:CollectionReference;
  serverStatus : DocumentReference;
  postCommentRef:CollectionReference;
  constructor(private fs: Firestore, private alertify : AlertsAndNotificationsService,private storage: Storage) {
    this.contactDoc = collection(this.fs,'contactRequests');
    this.usersDoc = collection(this.fs,'users');
    this.serverStatus = doc(this.fs,'admin/serverStatus');
  }
  addContactRequest(name: string, email: string,phoneNumber:string,type:string,gender: string){
    let data:ContactRequest = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      date: new Date(),
      type:type,
      gender:gender
    }
    console.log('Adding data',data)
    addDoc(this.contactDoc,data).then((doc)=>{
      //console.log(doc);
      //console.log(doc.id)
      this.alertify.presentToast('Thank you for requesting, We will contact you Soon !','info',4000)
    })
  }
  async getContactRequest(){
    let qry = query(this.contactDoc);
    return getDocs(qry);
  }
  async getUserList(){
    let qry = query(this.usersDoc);
    return getDocs(qry);
  }
  addCommentById(id:string,data:PostComment){
    this.postCommentRef = collection(this.fs,'posts/'+id+'/comments');
    return addDoc(this.postCommentRef,data)
  }
  getCommentById(id:string){
    return getDocs(query(collection(this.fs,'posts/'+id+'/comments')));
  }
  async addChainedPolicyData(data:PolicyData[]){
    return await data.forEach(async (item)=>{
      return await setDoc(doc(this.fs,'policy/'+item.policyNumber),item)
    })
  }
  addPolicyData(id:string,data:PolicyData){
    setDoc(doc(this.fs,'policy/'+id),{
      data:data
    })
  }
  async upload(
    path: string,
    file: File | null
  ): Promise<any> {
    const ext = file!.name.split('.').pop(); 
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch(e: any) {
        console.error(e);
        return false
      }
    } else {
      // handle invalid file
      return false
    }
  }

  addDownloadableFile(path:string,name:string,refPath:string){
    return addDoc(collection(this.fs,'downloads'),{
      name:name,
      file:path,
      path:refPath,
      date:(new Date()).toLocaleDateString()
    })
  }
  getDownloadableFile(){
    return getDocs(collection(this.fs,'downloads'));
  }

  deleteFile(id:string,path:string){
    return deleteDoc(doc(this.fs,'downloads/'+id))
    .then(()=>{
      return deleteObject(ref(this.storage,path))
    })
  }
}
