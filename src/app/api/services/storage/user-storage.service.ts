import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * Set business Data
   * @param business : Api common payload object
   * @returns void
   */
  public setUser(business?: any): any {
    this.user.next(business);
  }

  /**
   * Get business Data
   * @returns Observable<business>
   */
  public getUser(observable: boolean = false): Observable<any> {
    if (!observable) return this.user.getValue();
    return this.user.asObservable();
  }
}
