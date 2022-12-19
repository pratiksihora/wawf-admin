import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

// External Modules
import { Observable, of } from "rxjs";

// Storage
import { BusinessStorageService } from "src/app/api/services/storage/business-storage.service";

//Utils
import { StorageUtil } from "../utils/storage";

@Injectable({ providedIn: 'root' })
export class TimezoneResolver implements Resolve<any> {
  constructor(private storage: BusinessStorageService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> {
    let bs: any = this.storage.getBusiness();
    let business = bs?.billing?.business;
    business && StorageUtil.setTimezoneAndFormat({ tz: business.bs_time_zone, date: business.bs_date_format, time: business.bs_time_format });
    return of({})
  }
}