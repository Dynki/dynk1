import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AngularFire, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';
import { Router} from '@angular/router';

import { DynToastService } from '../../dyn-shell/shared/dyn-toast.service';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  firebaseAuth: AngularFireAuth;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public af: AngularFire, public toastService: DynToastService, private router: Router) {
    this.firebaseAuth = af.auth;

    this.af.auth.subscribe(auth => {
      if (auth === undefined || auth === null){
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      }
    });

  }

  login(username: string, password: string) {
    this.af.auth.login({ email: username, password: password })
    .then(() => { 
      this.toastService.showToast({ Title: 'Authentication', Msg: 'Logged In', Type: 'success' })
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  logout(): void {
    this.af.auth.logout()
    .then(() => {
      this.toastService.showToast({ Title: 'Authentication', Msg: 'Logged Out', Type: 'success' })
      this.router.navigate(['/login']);
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e, Type: 'error' }))
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
     
    this.af.auth.createUser({ email: username, password: password })
    .then(() => this.toastService.showToast({ Title: 'Authentication', Msg: 'User created', Type: 'success' }))
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  getAuthenticated(): Observable<any> { return this.af.auth; }

  forgotPassword(email: string) :void {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => this.toastService.showToast({ Title: 'Authentication', Msg: 'Email Sent to ' + email, Type: 'success' }))
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

  socialSignIn(socialProvider: string){
    this.af.auth.login({ provider: AuthProviders[socialProvider], method: AuthMethods.Popup })
    .then(() => { 
      this.toastService.showToast({ Title: 'Authentication', Msg: 'Logged In', Type: 'success' })
    })
    .catch((e) => this.toastService.showToast({ Title: 'Authentication', Msg: e.message, Type: 'error' }))
  }

}