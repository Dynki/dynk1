import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ToastyModule } from 'ng2-toasty';
import 'hammerjs';

import { ToolbarComponent } from './dyn-toolbar/dyn-toolbar.component';
import { BreadcrumbComponent } from './dyn-breadcrumb/dyn-breadcrumb.component';
import { HomeComponent } from './dyn-home/dyn-home.component';
import { FeaturesComponent } from './dyn-features/dyn-features.component';
import { ShellRoutingModule } from './dyn-shell-routing.module';
import { DynToastService } from './shared/dyn-toast.service';
import { CustomerModule } from '../dyn-customers/dyn-customer.module';
import { AuthModule } from '../dyn-auth/dyn-auth.module';

// other imports 
@NgModule({
  declarations: [
    ToolbarComponent,
    BreadcrumbComponent,
    HomeComponent,
    FeaturesComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    ToastyModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    ShellRoutingModule
  ],
  exports: [
    ToolbarComponent,
    BreadcrumbComponent,
    HomeComponent,
    FeaturesComponent,
    MaterialModule,
    ToastyModule,
    CustomerModule,
    AuthModule
  ],
  providers: [
    ToastyService,
    ToastyConfig,
    DynToastService
  ],
})
export class ShellModule { 
}
