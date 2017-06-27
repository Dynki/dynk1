import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../shared/dyn-auth.service';

@Component({
  selector: 'dyn-confirm',
  templateUrl: './dyn-confirm.component.html',
  styleUrls: ['./dyn-confirm.component.scss'],
})
export class ConfirmComponent {
  message: string;
  email: string;
  code: string;

  constructor(public authService: AuthService, public router: Router) {
    this.email = this.authService.currentUserEmail;
  }

  confirmCode() {
    this.authService.confirmCode(this.email, this.code);
  }
  features(){
    this.router.navigate(['/features']);
  }
}
