import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  
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

import { ShellComponent } from './dyn-shell.component';
import { ToolbarComponent } from './dyn-toolbar/dyn-toolbar.component';
import { UserProfileBannerComponent } from './dyn-userprofile-banner/dyn-userprofile-banner.component';
import { BreadcrumbComponent } from './dyn-breadcrumb/dyn-breadcrumb.component';
import { HomeComponent } from './dyn-home/dyn-home.component';
import { FeaturesComponent } from './dyn-features/dyn-features.component';
import { ShellRoutingModule } from './dyn-shell-routing.module';
import { DynToastService } from './shared/dyn-toast.service';
import { DynDialogService } from './dyn-confirm/dyn-confirm.service';
import { ConfirmationComponent } from './dyn-confirm/dyn-confirm.component';
import { CustomerModule } from '../dyn-customers/dyn-customer.module';
import { AuthModule } from '../dyn-auth/dyn-auth.module';
import { TruncatePipe } from './shared/dyn-truncate.pipe';

// other imports 
@NgModule({
  declarations: [
    ToolbarComponent,
    UserProfileBannerComponent,    
    BreadcrumbComponent,
    HomeComponent,
    FeaturesComponent,
    ConfirmationComponent,
    TruncatePipe,
    ShellComponent
  ],
  imports: [
    MaterialModule,
    ToastyModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    ShellRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ToolbarComponent,
    UserProfileBannerComponent,
    BreadcrumbComponent,
    HomeComponent,
    FeaturesComponent,
    MaterialModule,
    ToastyModule,
    CustomerModule,
    AuthModule,
    TruncatePipe,
    ShellComponent
  ],
  providers: [
    ToastyService,
    ToastyConfig,
    DynToastService,
    DynDialogService
  ],
  entryComponents: [ConfirmationComponent]
})
export class ShellModule { 
}
