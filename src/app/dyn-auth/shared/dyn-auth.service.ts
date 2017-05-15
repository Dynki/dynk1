import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router} from '@angular/router';

import { DynToastService } from '../../dyn-shell/shared/dyn-toast.service';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  firebaseAuth: AngularFireAuth;
  currentUserName: string;
  currentUserEmail: string; 

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth, public toastService: DynToastService, private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth === undefined || auth === null){
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.getUserDetails(auth);
        this.router.navigate(['/']);
      }
    });
  }

  private getUserDetails(auth: firebase.User){
    this.currentUserName = auth.displayName ? auth.displayName : auth.email;
    this.currentUserEmail = auth.email;
  }

  login(username: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(username, password )
    .then(() => { 
      this.toastService.showToast({ Title: 'Authentication', Msg: 'Logged In', Type: 'success' })
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  logout(): void {
    this.afAuth.auth.signOut()
    .then(() => {
      this.toastService.showToast({ Title: 'Authentication', Msg: 'Logged Out', Type: 'success' })
      this.router.navigate(['/login']);
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  signUp(username: string, password: string, termsAgreed: boolean): void {
    
    if (username === '' || username === null || username === undefined) {
      this.toastService.showToast({ Title: 'Invalid Email', Msg: 'Please enter a valid email addfress', Type: 'info' })
      return;
    } 

    if (password === '' || password === null || password === undefined) {
      this.toastService.showToast({ Title: 'Invalid Email', Msg: 'Please enter a valid email addfress', Type: 'info' })
      return;
    } 

    if (termsAgreed !== true) {
      this.toastService.showToast({ Title: 'Terms', Msg: 'Please agree terms to sign up', Type: 'info' })
      return;
    }
     
    this.afAuth.auth.createUserWithEmailAndPassword(username, password)
    .then(() => this.toastService.showToast({ Title: 'Authentication', Msg: 'User created', Type: 'success' }))
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  getAuthenticated(): Observable<any> { return this.afAuth.authState; }

  forgotPassword(email: string) :void {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => this.toastService.showToast({ Title: 'Authentication', Msg: 'Email Sent to ' + email, Type: 'success' }))
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  socialSignIn(socialProviderDesc: string){

    let socialProvider;

    switch (socialProviderDesc) {
      case 'Facebook':
        socialProvider = new firebase.auth.FacebookAuthProvider()
        break;
      case 'Google':
        socialProvider = new firebase.auth.GoogleAuthProvider()
        break;
      case 'Twitter':
        socialProvider = new firebase.auth.TwitterAuthProvider()
        break;
      default:
        socialProvider = new firebase.auth.EmailAuthProvider()
        break;
    }

    this.afAuth.auth.signInWithPopup(socialProvider)
    .then(() => { 
      this.toastService.showToast({ Title: 'Authentication', Msg: 'Logged In', Type: 'success' })
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }


}