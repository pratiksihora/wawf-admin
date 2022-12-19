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
 * This component used to verify accesstoken exists navigate to default page
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 09/01/2021 (Pratik Shihora <pratik@saeculumsolutions.com>) AuthGuard created
 */
@Injectable({ providedIn: 'root', })
export class AuthGuard implements CanActivate, CanActivateChild {

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
  checkIfAuthorized(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    // validate access token
    if (TokenUtil.validateAccessToken()) {
      return of(true);
    } else {
      this.router.navigate([ROUTE_CONSTANTS.AUTH], { queryParams: { returnUrl: state.url } });
      return of(false);
    }
  }

}
