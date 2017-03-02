import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AuthGuard } from '../../dyn-auth/shared/dyn-auth-guard.service';
import { AuthService} from '../../dyn-auth/shared/dyn-auth.service';
import { LoginComponent } from '../dyn-login/dyn-login.component';
 
const appRoutes: Routes = [
  { path: 'login', 
    component: LoginComponent, 
    data: { breadcrumb: "login", parents: [] } 
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
export class CustomerRoutingModule { 
}
