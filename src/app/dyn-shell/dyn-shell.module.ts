import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent } from './dyn-toolbar/dyn-toolbar.component';
import { CustomerComponent } from '../dyn-customers/dyn-customer/dyn-customer.component';
import { CustomerDetailComponent } from '../dyn-customers/dyn-customer-detail/dyn-customer-detail.component';
import { BreadcrumbComponent } from './dyn-breadcrumb/dyn-breadcrumb.component';

import 'hammerjs';
  
const appRoutes: Routes = [
  { path: 'customers', component: CustomerComponent, data: { breadcrumb: "customers" } },
  { path: 'customers/:id', component: CustomerDetailComponent, data: { breadcrumb: 'customers:/id'} }
];

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
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule
  ],
  exports: [
    ToolbarComponent,
    CustomerComponent,
    CustomerDetailComponent,
    BreadcrumbComponent,
    RouterModule,
    MaterialModule
  ],
  providers: [],
})
export class ShellModule { 
}
