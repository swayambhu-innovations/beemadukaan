import { Injectable, Optional } from '@angular/core';
import { Firestore, collectionData, collection, getDoc, doc, DocumentReference, docData } from '@angular/fire/firestore';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInWithPhoneNumber, FacebookAuthProvider, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { DataProvider } from '../providers/data.provider';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {
  public loggedIn:boolean = false;
  userDoc:DocumentReference | undefined;
  checkerUserDoc:DocumentReference | undefined;
  private userServerSubscription:Subscription | undefined = undefined;
  constructor(
    private auth: Auth,
    private alertify:AlertsAndNotificationsService,
    private dataProvider : DataProvider,
    private userData:UserDataService,
    private firestore: Firestore,
    private router:Router
    ) {
    //this.checkAuth();
    if (auth) {
      this.user = authState(this.auth);
      this.setDataObserver(this.user);
      this.userDisposable = authState(this.auth).pipe(
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
        this.dataProvider.loggedIn = isLoggedIn;
      });
    } else {
      this.loggedIn = false;
    }
  }
  private userDisposable: Subscription|undefined;
  public  user: Observable<User | null> = EMPTY;

  // Read functions start
  public get isLoggedIn(): boolean {
    console.log(this.loggedIn)
    return this.loggedIn;
  }

  public get getUser(): Observable<User | null> {
    return this.user;
  }
  // Read functions end
  // Sign in functions start
  public async signInWithGoogle(){
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (credentials:UserCredential)=>{
      console.log(credentials);
      if (!(await getDoc(doc(this.firestore,'users/'+credentials.user.uid))).exists()){
        if (credentials.user.phoneNumber == null){
          await this.userData.setGoogleUserData(credentials.user,{phoneNumber:''});
        } else {
          await this.userData.setGoogleUserData(credentials.user,{phoneNumber:credentials.user.phoneNumber});
        }
      } else {
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Logging you in.','info',5000);
        this.router.navigate(['']);
      }
    }).catch((error)=>{
      this.dataProvider.pageSetting.blur = false;
      if (error.code === 'auth/popup-closed-by-user'){
        this.alertify.presentToast('Login cancelled.','error',5000);
      } else {
        this.alertify.presentToast(error.message,'error',5000);
      }
    });
  }

  public async loginAnonymously() {
    let data = signInAnonymously(this.auth).then((credentials:UserCredential)=>{
      console.log(credentials);
    });
    console.log(data);
  }

  public checkAuth(): Observable<any>{
    let data : any;
    if (this.auth) {
      this.user = authState(this.auth);
      data = authState(this.auth)
      .pipe(
        map(response => {
          let a = {
            response : response,
            isLoggedIn : this.isLoggedIn
          }
          return a;
        })
      );
    }
    return data;
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
    return await signOut(this.auth).then(
      (res) => {
        this.alertify.presentToast('Logged Out !','info',4000)
      }
    );
  }
  // Sign out functions end
  private setDataObserver(user: Observable<User | null>) {
    // console.log('Starting data observer')
    if (user) {
      // console.log('Setting data observer')
      user.subscribe(u => {
        if (u) {
          this.dataProvider.loggedIn = true;
          this.dataProvider.gettingUserData= true;
          // console.log('User is logged in')
          this.userDoc = doc(this.firestore,'users/'+u.uid);
          // console.log("User data from auth",u);
          if (this.userServerSubscription!=undefined){
            this.userServerSubscription.unsubscribe();
          }
          this.userServerSubscription = docData(this.userDoc).subscribe((data:any) => {
            // console.log("Recieved new data",data)
            this.dataProvider.userData = data;
            this.dataProvider.gettingUserData= false;
          })
        }
      });
    } else {
      if (this.userServerSubscription!=undefined){
        this.userServerSubscription.unsubscribe();
      }
    }
  }

}
