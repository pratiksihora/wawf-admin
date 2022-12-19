import { Injectable } from "@angular/core";

// External Modules
import { BehaviorSubject, Observable } from "rxjs";

// Utils
import { StorageUtil } from "src/app/_core/utils/storage";

@Injectable({ providedIn: 'root' })
export class BusinessStorageService {

  business: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * Set business Data
   * @param business : Api common payload object
   * @returns void
   */
  public setBusiness(bs?: any): any {
    let business = bs?.billing?.business;
    business && StorageUtil.setTimezoneAndFormat({ tz: business.bs_time_zone, date: business.bs_date_format, time: business.bs_time_format });
    this.business.next(bs);
  }

  /**
   * Get business Data
   * @returns Observable<business>
   */
  public getBusiness(observable: boolean = false): Observable<any> {
    if (!observable) return this.business.getValue();
    return this.business.asObservable();
  }
}