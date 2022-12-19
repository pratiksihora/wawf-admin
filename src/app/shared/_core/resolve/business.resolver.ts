import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";

// External Modules
import { catchError, EMPTY, map, Observable, of } from "rxjs";

// Services
import { UserService } from "src/app/api/services/user/user.service";
import { BusinessStorageService } from "src/app/api/services/storage/business-storage.service";

//Utils
import { ApiUtil } from "../utils/api";
import { TokenUtil } from "../utils/token";
import { PaymentUtil } from "../utils/payment/payment.util";

// Interfaces & Enums
import { ApiModule } from "src/app/api/enums/api-module.enum";
import { ApiAction } from "src/app/shared/constants/models/api";

// Constants
import { USER_API } from "src/app/api/constants/user/user-api";
import { ROUTE_CONSTANTS } from "src/app/shared/constants/static-constants/routing";
import { BILLING_API } from "src/app/api/constants/billing/billing-api";

@Injectable({ providedIn: 'root' })
export class BusinesResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private userService: UserService,
    private storage: BusinessStorageService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> {
    const info: ApiAction = ApiUtil.configureGet({ module: ApiModule.BUSINESS, url: BILLING_API.GET });
    const access: ApiAction = ApiUtil.configureGet({ module: ApiModule.BUSINESS, url: USER_API.ACCESS });
    // return of({})
    return this.userService.userCommon(info, { bs_id: route.paramMap.get('bs_id') }).pipe(map(res => {
      let value = { billing: { ...res?.data, ...PaymentUtil.setup(res.data) } };
      this.storage.setBusiness(value);
      TokenUtil.setUbId(value.billing?.user?.ub_id);
      TokenUtil.setBsId(value.billing?.user?.ub_fk_bs_id);
      return value;
    }), catchError(err => {
      this.router.navigate([ROUTE_CONSTANTS.ERROR]);
      return EMPTY;
    }));
  }
}