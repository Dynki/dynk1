import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../shared/dyn-auth.service';

@Component({
  selector: 'dyn-login',
  templateUrl: './dyn-login.component.html',
  styleUrls: ['./dyn-login.component.css'],
})
export class LoginComponent {
  message: string;
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    this.message = 'Trying to log in ...';
    this.authService.login();
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
