import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// External Depedency
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Http Services
import { HttpService } from 'src/app/_core/services/http/http.service';

// Api Actions
import { ApiAction } from 'src/app/constants/models/api';
import { ToastrUtil } from '../../../../_core/utils/toastr';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../shared/base/toastr/toast-service/toast.service';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';

@Injectable({ providedIn: 'root' })
export class FileService extends HttpService {

  compressionConfig = {
    ratio: 70,
    quality: 65
  };

  constructor(public httpClient: HttpClient,
    public route: ActivatedRoute,
    public toast: ToastService,
    private imageCompress: NgxImageCompressService
  ) {
    super(httpClient, route, toast);
  }

  /**
   * Global common master api
   * @param payload : Api common payload object
   * @returns Observable<ApiResponse>
   */
  public fileCommon(common: ApiAction, payload: any, headers: HttpHeaders = null): Observable<any> {
    return this.apiCall(common, payload, headers);
  }

  /**
 * File common upload api
 * @param payload : Api common payload object
 * @returns Observable<ApiResponse>
 */
  public uploadFile(common?: ApiAction, payload?: any, options?: any): Observable<any> {
    if (!options) { options = { reportProgress: true, observe: 'events' }; }
    return this.apiCall(common, payload, null, options).pipe(map((event: any) => {
      // return if observe is not events
      if (!(options.observe === 'events')) { return event };
      // else track events
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', progress };
        case HttpEventType.Response:
          if (!options?.hideToast) {
            this.showToastr(ToastrUtil.configureSuccess({ type: 'success', title: 'Success', message: 'Image has been uploaded successfully.' }));
          }
          return common?.response ? common.response(event.body) : event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));;
  }

  /**
 * File common upload api
 * @param payload : Api common payload object
 * @returns Observable<ApiResponse>
 */
  public upload_file(common?: ApiAction, payload?: any, options: any = null): Observable<any> {
    if (!options) { options = { reportProgress: true, observe: 'events' }; }
    return this.apiCall(common, payload.payload, null, options).pipe(map((event: any) => {
      // return if observe is not events
      if (!(options.observe === 'events')) { return event };
      // else track events
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', progress };
        case HttpEventType.Response:
          this.showToastr(ToastrUtil.configureSuccess({ type: 'success', title: 'Success', message: `${payload.type} has been uploaded successfully.` }));
          return event.body;
        case 3:
          break;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));;
  }

  /**
   *  convert base64 string into blob
   * @param b64Data : base64 data string
   * @param contentType : content type. for eg image/png
   * @param sliceSize 
   * @returns 
   */
  base64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  /**
   * Convet blob to base64 string
   * @param blob :
   * @returns 
   */
  async blobToBase64(blob): Promise<any> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Compress jpeg, jpg, png images
   * @param data : file blob of a file
   * @param file : file to compress
   * @returns 
   */
  async compressImageFile(data, fileData, isBlob = true): Promise<File> {

    // let base64 = isBlob ?  await this.blobToBase64(data) : data;
    const type = fileData.type;

    return new Promise(async (resolve, _) => {
      if (type === 'gif') {
        const finalFile = isBlob ? data : await this.base64toBlob(data.split(',')[1]);
        resolve(new File([finalFile], fileData.name, { type: `image/${type}` }))
        return;
      }

      const base64 = isBlob ? await this.blobToBase64(data) : data;
      this.imageCompress.compressFile(base64, DOC_ORIENTATION.Default, this.compressionConfig.ratio, this.compressionConfig.quality).then(async check => {
        const compressBlob = this.base64toBlob(check.split(',')[1], `image/${type}`)
        resolve(new File([compressBlob], fileData.name || `Gamify_${new Date().getTime()}.${type}`, { type: `image/${type}` }));
      })
    })
  }
}
