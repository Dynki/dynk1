import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ShellComponent } from './dyn-shell/dyn-shell.component';
import { ShellModule } from './dyn-shell/dyn-shell.module';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyD05_Ol0zocqnYK5FY95Wh__vlK45eXLdw",
  authDomain: "dynki-c5141.firebaseapp.com",
  databaseURL: "https://dynki-c5141.firebaseio.com",
  storageBucket: "dynki-c5141.appspot.com",
  messagingSenderId: "957203868799"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

firebase.initializeApp(firebaseConfig);

// other imports 
@NgModule({
  declarations: [
    AppComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    HttpModule,
    ShellModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
