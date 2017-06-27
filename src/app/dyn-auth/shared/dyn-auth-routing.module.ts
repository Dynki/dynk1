import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AuthGuard } from '../../dyn-auth/shared/dyn-auth-guard.service';
import { AuthService} from '../../dyn-auth/shared/dyn-auth.service';
import { LoginComponent } from '../dyn-login/dyn-login.component';
import { SignupComponent } from '../dyn-signup/dyn-signup.component';
import { ConfirmComponent } from '../dyn-confirm/dyn-confirm.component';
 
const appRoutes: Routes = [
  { path: 'login', 
    component: LoginComponent, 
    data: { breadcrumb: "login", parents: [] } 
  },
  { path: 'signup', 
    component: SignupComponent, 
    data: { breadcrumb: "signup", parents: [] } 
  },
  { path: 'confirm', 
    component: ConfirmComponent, 
    data: { breadcrumb: "confirm", parents: [] } 
  },
];

// other imports 
@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthGuard, AuthService],
})
export class LoginRoutingModule { 
}
