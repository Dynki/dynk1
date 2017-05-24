// /* tslint:disable:no-unused-variable */

// import { TestBed, async } from '@angular/core/testing';
// import { LoginComponent } from './dyn-login.component';
// import { APP_BASE_HREF } from '@angular/common';
// import { AuthService } from '../shared/dyn-auth.service';

// class AuthServiceMock {
//     isLoggedIn: Boolean;

//     constructor(){
//         this.isLoggedIn = false;
//     }

//     public login(){
//         this.isLoggedIn = true;
//     }

//     public logout(){
//         this.isLoggedIn = false;
//     }
// }

// describe('AppComponent', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         LoginComponent
//       ],
//       providers: [
//       { provide: APP_BASE_HREF, useValue: '/' },
//       { provide: AuthService, useClass: AuthServiceMock },
//       ]
//     });
//     TestBed.compileComponents();
//   });

//   it('should log in the user', async(() => {
//     const fixture = new ;
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));

//   it(`should have as title 'app works!'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('app works!');
//   }));

//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('app works!');
//   }));
// });
