import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AuthGuard } from '../dyn-auth/shared/dyn-auth-guard.service';
import { AuthService} from '../dyn-auth/shared/dyn-auth.service';

import { ShellComponent } from './dyn-shell.component';
 
const appRoutes: Routes = [
  { path: 'home', 
    component: ShellComponent, 
    data: { breadcrumb: "customers", parents: [] },
  }
];

// other imports 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthGuard, AuthService],
})
export class ShellRoutingModule { 
}
