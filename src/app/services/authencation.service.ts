import { Injectable, Optional } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInWithPhoneNumber, FacebookAuthProvider } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {
  private loggedIn:boolean = false;
  constructor(private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
      });
    } else {
      this.loggedIn = false;
    }
  }
  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;
  
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
    let data = signInWithPopup(this.auth, new GoogleAuthProvider()).then((credentials:any)=>{
      console.log(credentials);
    });
    console.log(data);
  }

  public async loginAnonymously() {
    let data = signInAnonymously(this.auth).then((credentials:any)=>{
      console.log(credentials);
    });
    console.log(data);
  }

  public async loginEmailPassword(email: string, password: string){
    let data = await signInWithEmailAndPassword(this.auth, email, password).then((credentials:any)=>{
      console.log(credentials);
    });
    console.log(data);
  }
  // Sign in functions end
  // Sign out functions start
  public async logout() {
    return await signOut(this.auth);
  }
  // Sign out functions end


}
