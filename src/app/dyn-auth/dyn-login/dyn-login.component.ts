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
  }
  login() {
    this.authService.login(this.email, this.password);
  }
  logout() {
    this.authService.logout();
  }
  signUp() {
    this.authService.signUp(this.email, this.password, this.termsAgreed);
  }
  forgotPassword(){
    this.authService.forgotPassword(this.email);
  }
  features(){
    this.router.navigate(['/features']);
  }
}
