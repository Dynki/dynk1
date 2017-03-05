import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './dyn-login/dyn-login.component';
import { LoginRoutingModule } from './shared/dyn-auth-routing.module';
  
// other imports 
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent,
    LoginRoutingModule
  ],
  providers: [],
})
export class AuthModule { 
}
