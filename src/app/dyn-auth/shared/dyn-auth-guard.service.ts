import { Injectable }       from '@angular/core';
import { CanActivate, 
  CanLoad,
  Router, 
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
 }                          from '@angular/router';

import { AuthService } from './dyn-auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);  
  }
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // Navigate to the login page
    // this.router.navigate(['/login']);
    return true;
  }
}