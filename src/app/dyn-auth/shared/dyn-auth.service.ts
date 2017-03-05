import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth === undefined || auth === null){
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }

  login() {
    this.af.auth.login({ email: 'deanselvey@gmail.com', password: 'D3veloper1#' })
    .then(() => console.log('logged in'))
    .catch((e) => console.log(e.message))
  }

  logout(): void {
    this.af.auth.logout()
    .then(() => console.log('logged out'))
    .catch((e) => console.log(e))
  }

}