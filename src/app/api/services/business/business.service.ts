import { Injectable } from '@angular/core';

// External Depedency
import { Observable } from 'rxjs';

// Http Services
import { HttpService } from 'src/app/_core/services/http/http.service';

// Api Actions
import { ApiAction } from 'src/app/constants/models/api';

@Injectable({ providedIn: 'root' })
export class BusinessService extends HttpService {

  /**
   * Business common api
   * @param payload : Api common payload object
   * @returns Observable<ApiResponse>
   */
  public businessCommon(common?: ApiAction, payload?: any): Observable<any> {
    return this.apiCall(common, payload);
  }
}