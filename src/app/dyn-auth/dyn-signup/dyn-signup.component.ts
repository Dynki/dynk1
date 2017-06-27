import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../shared/dyn-auth.service';

@Component({
  selector: 'dyn-signup',
  templateUrl: './dyn-signup.component.html',
  styleUrls: ['./dyn-signup.component.scss'],
})
export class SignupComponent {
  message: string;
  email: string;
  password: string;
  termsAgreed: boolean;

  constructor(public authService: AuthService, public router: Router) {
    this.termsAgreed = true;
    this.email = this.authService.currentUserEmail;
  }
  signUp() {
    this.authService.signUp(this.email, this.password, this.termsAgreed);
  }
  confirmCode(){
    this.router.navigate(['/confirm']);
  }
  features(){
    this.router.navigate(['/features']);
  }
}
