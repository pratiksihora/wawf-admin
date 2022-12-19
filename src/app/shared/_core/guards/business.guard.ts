// ANGULAR DEPENDANCY
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

// EXTERNAL DEPENDANCY
import { catchError, map, Observable, of } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

// Services
import { UserService } from 'src/app/api/services/user/user.service';

// Utils
import { PermissionUtil } from '../utils/permission/permission.util';
import { ApiUtil } from '../utils/api';

// CONSTANT
import { ROUTE_CONSTANTS } from 'src/app/shared/constants/static-constants/routing';
import { USER_API } from 'src/app/api/constants/user/user-api';

// Interfaces & Enums
import { ApiAction } from 'src/app/shared/constants/models/api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

/**
 * This component used to verify accesstoken exists navigate to default page
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 09/01/2021 (Pratik Shihora <pratik@saeculumsolutions.com>) AuthGuard created
 */
@Injectable({ providedIn: 'root', })
export class BusinessGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService, private permissionService: NgxPermissionsService) { }

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
   * Checks if the Activated component is authorized
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   */
  checkIfAuthorized(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // validate permission
    const access: ApiAction = ApiUtil.configureGet({ module: ApiModule.BUSINESS, url: USER_API.ACCESS });
    return this.userService.userCommon(access, { bs_id: route.paramMap.get('bs_id') }).pipe(map(res => {
      const permissions = res.data?.role?.business_role_permission;
      this.permissionService.flushPermissions();
      this.permissionService.loadPermissions(PermissionUtil.setPermission(permissions));
      return true;
    }), catchError(() => {
      this.router.navigate([ROUTE_CONSTANTS.AUTH], { queryParams: { returnUrl: state.url } });
      return of(false);
    }));
  }

}
