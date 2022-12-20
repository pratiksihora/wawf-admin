import { Injectable } from '@angular/core';

// External Depedency
import { Observable } from 'rxjs';

// Http Services
import { HttpService } from 'src/app/shared/_core/services/http/http.service';

// Api Actions
import { ApiAction } from 'src/app/shared/constants/models/api';

@Injectable({ providedIn: 'root' })
export class AuthService extends HttpService {

  /**
   * Business common api
   * @param payload : Api common payload object
   * @returns Observable<ApiResponse>
   */
  public authCommon(common?: ApiAction, payload?: any): Observable<any> {
    return this.apiCall(common, payload);
  }
}