// Angular
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Rxjs
import { Observable, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';
import { ROUTE_CONSTANTS } from '../../constants/static-constants/routing';
import { ToastrUtil } from '../utils/toastr';

// Service

// Utils
import { TokenUtil } from '../utils/token';

// Constant

/**
 * This component used to navigate to login if the request is unauthorized
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 * Notes:-
 * Date: 09/01/2021 (Pratik Shihora <pratik@saeculumsolutions.com>) AuthInterceptor created
 */
@Injectable({ providedIn: 'root' })

export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastrService: ToastService) {
  }

  /**
    * Intercepts the response and navigate to login if the accesstoken is not valid
    * @param {HttpRequest<any>} request
    * @param {HttpHandler} next
    * @returns {Observable<HttpEvent<any>>}
    */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      this.toastrService.show(ToastrUtil.configureError({ type: 'error', title: 'Internet', message: 'No active connection found.' }));
      return of();
    }

    return next.handle(request).pipe(
      catchError((error, caught) => {
        this.handleAuthError(error);
        return of(error);
      }) as any,
      finalize(() => true),
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      TokenUtil.clear();
      this.router.navigate([ROUTE_CONSTANTS.AUTH, ROUTE_CONSTANTS.LOGIN]);
    }
    throw err;
  }
}



