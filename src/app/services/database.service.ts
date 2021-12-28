import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData,DocumentReference, CollectionReference , collection , setDoc, doc, updateDoc, deleteDoc, docSnapshots, docData, getDoc } from '@angular/fire/firestore';
import { getDocs, query } from 'firebase/firestore';
import { ContactRequest } from '../structures/user.structure';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  contactDoc:CollectionReference;
  usersDoc:CollectionReference;
  serverStatus : DocumentReference;
  constructor(private fs: Firestore) {
    this.contactDoc = collection(this.fs,'contactRequests');
    this.usersDoc = collection(this.fs,'users');
    this.serverStatus = doc(this.fs,'admin/serverStatus');
  }
  addContactRequest(name: string, email: string,phoneNumber:string,message: string,age:string,gender: string){
    let data:ContactRequest = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
      date: new Date(),
      age:age,
      gender:gender
    }
    console.log('Adding data',data)
    addDoc(this.contactDoc,data).then((doc)=>{
      console.log(doc);
      console.log(doc.id)

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
}
