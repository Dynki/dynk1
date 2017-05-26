/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { LoginComponent } from './dyn-login.component';
import { AuthService } from '../shared/dyn-auth.service';

class AuthServiceMock {
  isLoggedIn: Boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  public login() {
    this.isLoggedIn = true;
  }

  public logout() {
    this.isLoggedIn = false;
  }
}

describe('LoginComponent', () => {

  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
  });

  it('should log in the user', async(() => {
    comp.login();
    fixture.detectChanges();
    expect(authService.isLoggedIn).toBeTruthy();
  }));

  it('should log out the user', async(() => {
    comp.logout();
    fixture.detectChanges();
    expect(authService.isLoggedIn).toBeFalsy();
  }));
});
