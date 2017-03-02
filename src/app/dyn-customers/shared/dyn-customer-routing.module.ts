import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { CustomerComponent } from '../dyn-customer/dyn-customer.component';
import { CustomerDetailComponent } from '../dyn-customer-detail/dyn-customer-detail.component';
import { AuthGuard } from '../../dyn-auth/shared/dyn-auth-guard.service';
import { AuthService} from '../../dyn-auth/shared/dyn-auth.service';
 
const appRoutes: Routes = [
  { path: 'customers', 
    component: CustomerComponent, 
    canActivate: [AuthGuard],
    data: { breadcrumb: "customers", parents: [] } 
  },
  { 
    path: 'customers/:id', 
    canActivate: [AuthGuard],
    component: CustomerDetailComponent, 
    data: { breadcrumb: 'selected customer', parents: ['customers'] } 
  }
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
