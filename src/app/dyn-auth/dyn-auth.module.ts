import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './dyn-login/dyn-login.component';
import { SignupComponent } from './dyn-signup/dyn-signup.component';
import { LoginRoutingModule } from './shared/dyn-auth-routing.module';
import { UserLoginService, UserRegistrationService, CognitoUtil } from './shared/aws/dyn-cognito.service';
import { ConfirmComponent } from './dyn-confirm/dyn-confirm.component';
  
// other imports 
@NgModule({
  declarations: [
    ConfirmComponent,
    LoginComponent,
    SignupComponent
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
    ConfirmComponent,
    LoginComponent,
    SignupComponent,
    LoginRoutingModule
  ],
  providers: [
    UserLoginService,
    UserRegistrationService,
    CognitoUtil
  ],
})
export class AuthModule { 
}
