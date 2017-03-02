import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './dyn-login/dyn-login.component';
 
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
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [],
})
export class AuthModule { 
}
