import { Injectable, Optional } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInWithPhoneNumber, FacebookAuthProvider, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { DataProvider } from '../providers/data.provider';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {
  private loggedIn:boolean = false;

  constructor(private auth: Auth, private alertify:AlertsAndNotificationsService, private dataProvider : DataProvider, private userData:UserDataService,  private firestore: Firestore,) {
    this.checkAuth();
  }
  private  userDisposable: Subscription|undefined;
  public  user: Observable<User | null> = EMPTY;

  // Read functions start
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get getUser(): Observable<User | null> {
    return this.user;
  }
  // Read functions end
  // Sign in functions start
  public async signInWithGoogle(){
    let data = signInWithPopup(this.auth, new GoogleAuthProvider()).then((credentials:UserCredential)=>{
      console.log(credentials);
    });
    console.log(data);
  }

  public async loginAnonymously() {
    let data = signInAnonymously(this.auth).then((credentials:UserCredential)=>{
      console.log(credentials);
    });
    console.log(data);
  }

  public checkAuth(){
    if (this.auth) {
      this.user = authState(this.auth);

      this.userDisposable = authState(this.auth).pipe(
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
        console.log("isLoggedIn", isLoggedIn)
      });
    } else {
      this.loggedIn = false;
    }
  }
  public async loginEmailPassword(email: string, password: string){
    let data = await signInWithEmailAndPassword(this.auth, email, password).then((credentials:UserCredential)=>{
      console.log(credentials);
      this.checkAuth();
    });
    console.log(data);
  }
  // Sign in functions end
  public signUpWithEmailAndPassword(email: string, password: string,username:string){
    console.log("Signing Up")
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = createUserWithEmailAndPassword(this.auth, email, password).then(async (credentials:UserCredential)=>{
      await this.userData.setEmailUserData(credentials.user, {displayName:username,phoneNumber:'',photoURL:''});
    }).catch((error)=>{
      this.dataProvider.pageSetting.blur = false;
      if (error.code === 'auth/weak-password') {
        this.alertify.presentToast('Password is weak.','error',5000);
      } else if (error.code === 'auth/email-already-in-use') {
        this.alertify.presentToast('Email already in use.','error',5000);
      } else {
        this.alertify.presentToast(error.message,'error',5000);
      }
    });
  }
  // Sign out functions start
  public async logout() {
    return await signOut(this.auth);
  }
  // Sign out functions end


}
