import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomerComponent } from '../dyn-customers/dyn-customer/dyn-customer.component';
import { CustomerDetailComponent } from '../dyn-customers/dyn-customer-detail/dyn-customer-detail.component';
import { CustomerRoutingModule } from './shared/dyn-customer-routing.module';
 
// other imports 
@NgModule({
  declarations: [
    CustomerComponent,
    CustomerDetailComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    CustomerRoutingModule
  ],
  exports: [
    CustomerComponent,
    CustomerDetailComponent,
    CustomerRoutingModule
  ],
  providers: [],
})
export class CustomerModule { 
}
