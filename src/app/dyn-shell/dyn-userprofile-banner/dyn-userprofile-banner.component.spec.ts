/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { UserProfileBannerComponent } from './dyn-userprofile-banner.component';
import { APP_BASE_HREF } from '@angular/common';
import { MdIconRegistry } from '@angular/material';
import { AuthService } from '../../dyn-auth/shared/dyn-auth.service';
import { AuthServiceMock } from '../../dyn-auth/shared/dyn-auth.service.mock';
import { TruncatePipe } from '../shared/dyn-truncate.pipe';

describe('UserProfileBannerComponent', () => {

  let comp:    UserProfileBannerComponent;
  let fixture: ComponentFixture<UserProfileBannerComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserProfileBannerComponent,
        TruncatePipe
      ],
      providers: [
          MdIconRegistry,
          { provide: AuthService, useClass: AuthServiceMock },
          { provide: APP_BASE_HREF, useValue: '/' },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(UserProfileBannerComponent);
    de = fixture.debugElement.query(By.css('.dyn-user-img'));
    el = de.nativeElement;
    comp = fixture.componentInstance;
  });

  it(`should log out user when log out icon clicked`, async(() => {

    authService = fixture.debugElement.injector.get(AuthService);
    authService.login('TestUser', 'ABC123');
    fixture.detectChanges();
    expect(el.textContent).toEqual('T');
  }));
});
