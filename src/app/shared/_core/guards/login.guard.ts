// ANGULAR DEPENDANCY
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

// EXTERNAL DEPENDANCY
import { Observable, of } from 'rxjs';

// Utils
import { TokenUtil } from '../utils/token';

// CONSTANT
import { ROUTE_CONSTANTS } from 'src/app/shared/constants/static-constants/routing';

/**
 * This component used to verify access token if exists navigate to default page
 * @author Vikas thakkar <vikasthakkar@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 29/04/2021 (Vikas thakkar <vikasthakkar@saeculumsolutions.com>) Signin guard created
 */
@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  /**
   * Checks if the ActivatedComponent can be activated or not based on the token
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   */
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkIfAuthorized(route, state);
  }

  /**
    * Check if the ActivatedComponent's can be activated or not based on the token
    * @param {ActivatedRouteSnapshot} route
    * @param {RouterStateSnapshot} state
    */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkIfAuthorized(childRoute, state);
  }

  /**
   * Checks if the Activated component is authorized
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   */
  checkIfAuthorized(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    // validate access token
    if (TokenUtil.validateAccessToken()) {
      this.router.navigate([ROUTE_CONSTANTS.MAIN_ROUTE]);
      return of(false);
    } else {
      return of(true);
    }
  }

}
