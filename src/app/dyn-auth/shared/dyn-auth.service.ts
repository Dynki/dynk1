import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router} from '@angular/router';

import { DynToastService } from '../../dyn-shell/shared/dyn-toast.service';
import { UserLoginService, UserRegistrationService } from "../shared/aws/dyn-cognito.service";

@Injectable()
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;
  firebaseAuth: AngularFireAuth;
  currentUserName: string;
  currentUserEmail: string; 

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public awsAuth: UserLoginService, public awsRegistration: UserRegistrationService, public afAuth: AngularFireAuth, public toastService: DynToastService, private router: Router) {

    this.currentUserEmail = '';

    this.isLoggedIn = new BehaviorSubject(false);
    
    this.awsAuth.userAuthenticated.subscribe(auth => {
      if (auth === undefined || auth === null){
        this.isLoggedIn.next(false);
      } else {
        this.isLoggedIn.next(auth);
        // this.getUserDetails(auth);
        if (auth === false){
          this.router.navigate(['/login']);
        } else {
          this.getUserDetails();
          this.router.navigate(['/']);
        }
      }

    })
    this.awsAuth.checkAuthStatus();

    // this.afAuth.authState.subscribe(auth => {
    //   if (auth === undefined || auth === null){
    //     this.isLoggedIn = false;
    //   } else {
    //     this.isLoggedIn = true;
    //     this.getUserDetails(auth);
    //     this.router.navigate(['/']);
    //   }
    // });
  }

  private getUserDetails(){
    this.currentUserName = this.awsAuth.currentUserEmail;
    this.currentUserEmail = this.awsAuth.currentUserEmail;
  }

  login(username: string, password: string) {
    this.awsAuth.login(username, password)
    .then((r) => {
      this.toastService.showToast({ Title: 'Authentication', Msg: 'Logged In', Type: 'success' })
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  logout(): void {
    this.awsAuth.logout()
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
     
    this.awsRegistration.register(username, password)
    .then(() => {
      this.toastService.showToast({ Title: 'Authentication', Msg: 'User created', Type: 'success' })
      this.router.navigate(['/confirm']);
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  confirmCode(username: string, code: string): void {
    
    if (username === '' || username === null || username === undefined) {
      this.toastService.showToast({ Title: 'Invalid Email', Msg: 'Please enter a valid email addfress', Type: 'info' })
      return;
    } 

    if (code === '' || code === null || code === undefined) {
      this.toastService.showToast({ Title: 'Invalid Code', Msg: 'Please enter a valid confirmation code', Type: 'info' })
      return;
    } 

    this.awsRegistration.confirmRegistration(username, code)
    .then(() => { 
      this.toastService.showToast({ Title: 'Authentication', Msg: 'User Confirmed', Type: 'success' }) 
      this.awsAuth.checkAuthStatus();
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  getAuthenticated(): BehaviorSubject<boolean> { 
    return this.isLoggedIn;
  }

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