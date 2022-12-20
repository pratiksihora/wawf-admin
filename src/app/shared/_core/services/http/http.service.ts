import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// External Modules
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { get } from 'lodash';

// Services
import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';

// Enums and Interfaces
import { HttpMethod } from 'src/app/api/enums/http-method.enum';
import { ApiAction } from 'src/app/shared/constants/models/api';
import { NotificationType } from 'src/app/shared/constants/enums/common/notification/notification-type.enum';

// Utils
import { TokenUtil } from '../../utils/token';
import { ApiUtil } from '../../utils/api';
import { ToastrUtil } from '../../utils/toastr';
import { ToastrConfig } from 'src/app/shared/constants/models/controls/toastr/toastr-config';

/**
 * This service is base service to make all api call.
 * For make all api calls
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 05/10/2020 (Pratik Shihora <pratik@saeculumsolutions.com>) initially created api base service
 */
@Injectable()
export class HttpService {

  constructor(protected httpClient: HttpClient, protected route: ActivatedRoute, protected toast: ToastService) { }
  /**
   * Get Method
   * @param url {string}: url for make api call
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  public get<T>(url: string, body: any, headers?: HttpHeaders | any, config?: ApiAction): Observable<T> {
    return this.httpClient.get<T>(url, { headers: this.getAllHeaders(headers, body, config) });
  }

  /**
   * Post Method
   * @param url {string}: url for make api call
   * @param body {object}: body pass in request
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  protected post<T>(url: string, body: any, headers: HttpHeaders | any, config?: ApiAction): Observable<T> {
    return this.httpClient.post<T>(url, body, { headers: this.getAllHeaders(headers, body, config) });
  }

  /**
   * Upload Method
   * @param url {string}: url for make api call
   * @param body {object}: body pass in request
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  protected upload<T>(url: string, body: any, headers: HttpHeaders | any, options = {}, config?: ApiAction): Observable<T> {
    return this.httpClient.post<T>(url, body, { ...options, headers: this.getFileUploadHeader(headers, body, config) });
  }

  /**
   * Upload Patch Method
   * @param url {string}: url for make api call
   * @param body {object}: body pass in request
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  protected uploadPatch<T>(url: string, body: any, headers: HttpHeaders | any, options = {}, config?: ApiAction): Observable<T> {
    return this.httpClient.patch<T>(url, body, { ...options, headers: this.getFileUploadHeader(headers, body, config) });
  }

  /**
   * Upload Put Method
   * @param url {string}: url for make api call
   * @param body {object}: body pass in request
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  protected uploadPut<T>(url: string, body: any, headers: HttpHeaders | any, options = {}, config?: ApiAction): Observable<T> {
    return this.httpClient.put<T>(url, body, { ...options, headers: this.getFileUploadHeader(headers, body, config) });
  }

  /**
   * Put Method
   * @param url {string}: url for make api call
   * @param body {object}: body pass in request
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  protected put<T>(url: string, body: any, headers: HttpHeaders | any, config?: ApiAction): Observable<T> {
    return this.httpClient.put<T>(url, body, { headers: this.getAllHeaders(headers, body, config) });
  }

  /**
   * Delete Method
   * @param url {string}: url for make api call
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  protected delete<T>(url: string, body: any, headers: HttpHeaders | any, config?: ApiAction): Observable<T> {
    return this.httpClient.delete<T>(url, { body: config.skipPayload ? undefined : body, headers: this.getAllHeaders(headers, body, config) });
  }

  /**
   * Patch Method
   * @param url {string}: url for make api call
   * @param body {object}: body pass in request
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  protected patch<T>(url: string, body: any, headers: HttpHeaders | any, config?: ApiAction): Observable<T> {
    return this.httpClient.patch<T>(url, body, { headers: this.getAllHeaders(headers, body, config) });
  }

  /**
   * Get Headers for file upload
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  private getFileUploadHeader(headers: HttpHeaders | any, body: any, config?: ApiAction): HttpHeaders {
    if (!headers) {
      headers = new HttpHeaders();
    }

    if (body?.unique || TokenUtil.getUniqueId())
      headers = headers.set('UToken', btoa(body?.unique || TokenUtil.getUniqueId()));

    return headers;
  }

  /**
   * Get Headers
   * @param headers {HttpHeaders}: headers for pass external headers
   * @returns Observable<ApiResponse>
   */
  private getAllHeaders(headers: HttpHeaders | any, body: any, config?: ApiAction): HttpHeaders {
    try {
      if (!headers) {
        headers = new HttpHeaders();
      }

      if (!headers.has('Content-Type')) {
        headers = headers.set('Content-Type', 'application/json');
      }
      if (!headers.has('Accept')) {
        headers = headers.set('Accept', 'application/json');
      }

      // SE bucket CORS issue fix
      if (!headers['vary']) {
        headers['vary'] = [
          { key: 'Vary', value: 'Access-Control-Request-Headers' },
          { key: 'Vary', value: 'Access-Control-Request-Method' },
          { key: 'Vary', value: 'Origin' },
        ];
      }

      if (body?.unique || TokenUtil.getUniqueId())
        headers = headers.set('UToken', btoa(body?.unique || TokenUtil.getUniqueId()));

      return headers;
    } catch (error) {
    }
  }

  /**
  * Api Call Method
  * @param config {object}: config for make url and choose method
  * @param url {string}: url for make api call
  * @param body {object}: body pass in request
  * @param headers {HttpHeaders}: headers for pass external headers
  * @param options {object}: options for pass other options for api call
  * @returns Observable<ApiResponse>
  */
  protected apiCall<T>(config?: ApiAction, body?: object, headers?: HttpHeaders | any, options = {}, callback = null,): Observable<T> {
    const url = ApiUtil.getFullApiUrl(config, body);
    if (config?.httpMethod === HttpMethod.UPLOAD) {
      return this.upload(url, body, headers, options, config);
    } else if (config?.httpMethod === HttpMethod.UPLOAD_PATCH) {
      return this.uploadPatch(url, body, headers, options, config);
    } else if (config?.httpMethod === HttpMethod.UPLOAD_PUT) {
      return this.uploadPut(url, body, headers, options, config);
    }

    let request = null;
    switch (config?.httpMethod) {
      case HttpMethod.GET:
        request = this.get(url, body, headers, config);
        break;
      case HttpMethod.POST:
        request = this.post(url, body, headers, config);
        break;
      case HttpMethod.PATCH:
        request = this.patch(url, body, headers, config);
        break;
      case HttpMethod.PUT:
        request = this.put(url, body, headers, config);
        break;
      case HttpMethod.GET:
        request = this.put(url, body, headers, config);
        break;
      case HttpMethod.DELETE:
        request = this.delete(url, body, headers, config);
        break;
      default:
        request = this.post(url, body, headers, config);
    }
    return request.pipe(map((data: any) => this.handleSuccess(config, data, callback)), catchError((error: any) => this.handleError(config, error, callback)))
  }

  handleBody(config: ApiAction, body: object) {
    if (!config.compress) return body;
    return {
      module: config.module,
      method: config.method,
      data: body
    }
  }

  /**
   * Handle success 
   * @param config {object}: config for notification
   * @param data {object}: data return by api
   * @param callback {function}: callback function
   * @returns Observable<ApiResponse>
   */
  handleSuccess(config?: ApiAction, data?: any, callback?: any) {
    if (config?.success) {
      if (config.type === NotificationType.MODAL) {
        // this.showNotification({ type: ModalType.SUCCESS, title: config.title || 'Success', message: config.success }, callback);
      } else {
        this.showToastr(ToastrUtil.configureSuccess({ type: 'success', title: config.title || 'Success', message: config.success }));
      }
    }
    return config?.response ? config.response(data) : data;
  }

  /**
   * Handle error 
   * @param config {object}: config for notification
   * @param error {object}: error return by api
   * @param callback {function}: callback function
   * @returns Observable<ApiResponse>
   */
  handleError(config?: ApiAction, error?: any, callback?: any) {
    if (config.errorType === NotificationType.MODAL) {
      //  this.showNotification({ type: ModalType.ERROR, title: config.title || 'Error', message: get(error, 'error.Message') || config.error }, callback);
    } else {
      this.showToastr(ToastrUtil.configureError({ type: 'error', title: config.title || 'Error', message: config.error || get(error, 'error.message') }));
    }
    return throwError(error);
  }

  /**
    * Show toastr 
    * @param config {object}: config for notification
    * @param callback {function}: callback function
    * @returns Observable<ApiResponse>
    */
  showToastr(modal: ToastrConfig) {
    this.toast.show(modal)
  }

  /**
    * Show notification 
    * @param config {object}: config for notification
    * @param callback {function}: callback function
    * @returns Observable<ApiResponse>
    */
  // showNotification(modal: NotificationModalConfig, callback = null) {
  //   // this.config.showNotification(modal, callback)
  // }
}
