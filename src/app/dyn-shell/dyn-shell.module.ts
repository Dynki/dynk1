import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import 'hammerjs';

import { ToolbarComponent } from './dyn-toolbar/dyn-toolbar.component';
import { CustomerComponent } from '../dyn-customers/dyn-customer/dyn-customer.component';
import { CustomerDetailComponent } from '../dyn-customers/dyn-customer-detail/dyn-customer-detail.component';
import { BreadcrumbComponent } from './dyn-breadcrumb/dyn-breadcrumb.component';
import { ShellRoutingModule } from './dyn-shell-routing.module';

// other imports 
@NgModule({
  declarations: [
    ToolbarComponent,
    CustomerComponent,
    CustomerDetailComponent,
    BreadcrumbComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ShellRoutingModule
  ],
  exports: [
    ToolbarComponent,
    CustomerComponent,
    CustomerDetailComponent,
    BreadcrumbComponent,
    MaterialModule,
    ShellRoutingModule
  ],
  providers: [],
})
export class ShellModule { 
}
