import { Injectable } from "@angular/core";

// External Modules
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WorkspaceStorageService {

  workspaceReload$: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  /**
   * Set business Data
   * @param business : Api common payload object
   * @returns void
   */
  public setWorkspaceReload(reload?: any): any {
    this.workspaceReload$.next(reload);
  }

  /**
   * Get business Data
   * @returns Observable<business>
   */
  public workspaceReload(observable: boolean = false): Observable<any> {
    if (!observable) return this.workspaceReload$.getValue();
    return this.workspaceReload$.asObservable();
  }
}