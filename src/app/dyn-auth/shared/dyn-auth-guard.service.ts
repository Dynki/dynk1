import { Injectable }       from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CanActivate, 
  CanLoad,
  Router, 
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
 }                          from '@angular/router';

import { AuthService } from './dyn-auth.service';
import { UserLoginService } from "../shared/aws/dyn-cognito.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    // here check if this is first time call. If not return 
    // simple boolean based on user object from authService
    // otherwise:

    let returnValue = this.authService.isLoggedIn;

    if (!returnValue) {
      this.router.navigate(['/login']);
    }

    return returnValue;
  
    // return this.authService.getAuthenticated().map(user => {
    //       if (!user) {
    //         this.router.navigate(['/login']);
    //       }

    //       return user ? true : false;
    // })
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate();
  }

}