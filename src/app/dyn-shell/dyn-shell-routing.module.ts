import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { CustomerComponent } from '../dyn-customers/dyn-customer/dyn-customer.component';
import { CustomerDetailComponent } from '../dyn-customers/dyn-customer-detail/dyn-customer-detail.component';

const appRoutes: Routes = [
  { path: 'customers', component: CustomerComponent, data: { breadcrumb: "customers", parents: [] } },
  { path: 'customers/:id', component: CustomerDetailComponent, data: { breadcrumb: 'selected customer', parents: ['customers'] } }
];

// other imports 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class ShellRoutingModule { 
}
