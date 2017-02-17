import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ToolbarComponent } from './dyn-toolbar/dyn-toolbar.component';
import { CustomerComponent } from '../dyn-customers/dyn-customer/dyn-customer.component';

import 'hammerjs';
  
const appRoutes: Routes = [
  { path: 'customers', component: CustomerComponent }
];

// other imports 
@NgModule({
  declarations: [
    ToolbarComponent,
    CustomerComponent,
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    ToolbarComponent,
    CustomerComponent,
    RouterModule,
    MaterialModule
  ],
  providers: [],
})
export class ShellModule { 
}
