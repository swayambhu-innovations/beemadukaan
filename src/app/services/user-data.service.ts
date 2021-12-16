import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData,DocumentReference, CollectionReference , collection , setDoc, doc, updateDoc, deleteDoc, docSnapshots, docData, getDoc } from '@angular/fire/firestore';
import { UserData } from '../structures/user.structure';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersDoc:DocumentReference;
  constructor(private firestore: Firestore, private alertify:AlertsAndNotificationsService) {
    this.usersDoc = doc(this.firestore,'users');
  }
  public setGoogleUserData(user:any){
    let data:UserData = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      emailVerified:true,
      firstLogin:false,
      access: {
        access: 'User',
      },
      orders:[],
      totalOrders:0,
      totalCashback:0,
      wishlist:[],
      cart:[],
      friends:[],
    }
    setDoc(this.usersDoc,data).then(()=>{
      this.alertify.notify('User data set successfully')
    });
  }
}
