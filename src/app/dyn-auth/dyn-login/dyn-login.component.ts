import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../shared/dyn-auth.service';

@Component({
  selector: 'dyn-login',
  templateUrl: './dyn-login.component.html',
  styleUrls: ['./dyn-login.component.scss'],
})
export class LoginComponent {
  message: string;
  email: string;
  password: string;
  termsAgreed: boolean;

  constructor(public authService: AuthService, public router: Router) {
    this.termsAgreed = true;
    this.email = this.authService.currentUserEmail;
  }
  login() {
    this.authService.login(this.email, this.password);
  }
  logout() {
    this.authService.logout();
  }
  signUp() {
    this.authService.currentUserEmail = this.email;
    this.router.navigate(['/signup']);
  }
  forgotPassword(){
    this.authService.forgotPassword(this.email);
  }
  features(){
    this.router.navigate(['/features']);
  }

  googleSignIn(){
    this.authService.socialSignIn('Google');
  }
  facebookSignIn(){
    this.authService.socialSignIn('Facebook');
  }
  twitterSignIn(){
    this.authService.socialSignIn('Twitter');
  }
}
