import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AuthGuard } from '../dyn-auth/shared/dyn-auth-guard.service';
import { AuthService} from '../dyn-auth/shared/dyn-auth.service';

import { HomeComponent } from './dyn-home/dyn-home.component';
import { FeaturesComponent } from './dyn-features/dyn-features.component';
 
const appRoutes: Routes = [
  { path: '', 
    component: HomeComponent, 
    data: { breadcrumb: "home", parents: [] },
    canActivate: [AuthGuard]
  },
  { path: 'features', 
    component: FeaturesComponent, 
    data: { breadcrumb: "features", parents: [] }
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
