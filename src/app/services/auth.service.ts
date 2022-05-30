import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
GoogleAuthProvider
} from '@angular/fire/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';


import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth,
    public afAuth: AngularFireAuth // Inject Firebase auth service
    ) {}



  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then(res=> console.log(res));
  }



  AuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');

        console.log(result)
        console.log(result.user?.photoURL)

      })
      .catch((error) => {
        console.log(error);
      });
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // updateProfile(profileData: Partial<UserInfo>): Observable<any> {
  //   const user = this.auth.currentUser;
  //   return of(user).pipe(
  //     concatMap((user) => {
  //       if (!user) throw new Error('Not authenticated');

  //       return updateProfile(user, profileData);
  //     })
  //   );
  // }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  google_sign_in(){
    // return this.auth.
  }

  get_uid(){
    return this.auth.currentUser?.uid;
  }
  
}
