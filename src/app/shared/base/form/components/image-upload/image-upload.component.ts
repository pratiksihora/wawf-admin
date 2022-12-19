import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules
import { NgxPermissionsService } from 'ngx-permissions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

// Services
import { FileService } from 'src/app/api/services/common/file/file.service';

// Components
import { FormFileBaseComponent } from '../../base-class/form-base/form-file-base.component';

// Utils
import { FileOptionUtil } from 'src/app/shared/_core/utils/form/file';

// Default Enums
import { FileConstant } from 'src/app/shared/constants/enums/controls/file/file-constant.enum';
import { FileValidationType } from 'src/app/shared/constants/enums/controls/file/file-validate-type.enum';

//constant
import { PERMISSION } from 'src/app/shared/constants/permission/permission.constant';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent extends FormFileBaseComponent implements OnInit {

  imageUrl: string = FileConstant.IMAGE_URL;
  permissionConst = PERMISSION;
  bucketAwsUrl = environment.bucketAwsUrl;

  constructor(public fileService: FileService,
    public permissionService: NgxPermissionsService,
    public cdr: ChangeDetectorRef,
    public translate: TranslateService) {
    super(permissionService, cdr, translate);
  }

  ngAfterViewInit() {
    this.setSubscription();
  }

  /**
   * Set Subscription on the value changes for manage image url
   */
  setSubscription() {
    const control: any = this.form?.get(this.field.key);
    control && this.subscriptions.push(control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((value: any) => {
      const url = (value && value.trim().length ? value : null) || FileConstant.IMAGE_URL;
      this.imageUrl = url.replace(/ /g, '%20');
      this.cdr.detectChanges();
    }));
  }

  /**
   * Emits the event when any file selected
   * @param - event for selected file
   */
  fileChange(event: any) {
    const file = event.target.files && event.target.files[0];

    // validate file extar validations
    const error = FileOptionUtil.fileValidators(file, this.validators);
    if (error) {
      this._setCustomError(error);
      this._clearNativeFile();
      return;
    }

    this.apiCall(file);
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  /**
    * Upload file in server and validate and reset
    */
  apiCall(file: any) {
    // Make form data for file upload.
    const formData = new FormData();
    formData.append('file', file);

    if (this.field.api?.storage) {
      formData.append('type', this.field.api?.storage);
    }
    this.loading = true;
    // get file upload setting
    this.subscriptions.push(this.fileService.uploadFile(this._getUploadApiConfig(), formData, { reportProgress: true, observe: 'events', hideToast: true }).subscribe((response: any) => {
      if (response?.file_path) {
        this.form.get(this.field.key)?.setValue(response?.file_path);
        this._handleApiCall();
      }
    }, err => {
      this._handleApiCall(err);
    }));
  }

  /**
   * Handle api call and common logic for success and error 
   */
  _handleApiCall(error?: any) {
    this.loading = false;
    this._clearMessage();
    this._clearNativeFile();
    this._setCustomError(error && { type: FileValidationType.SERVER_ERROR, message: error?.error?.message });
    this.cdr.detectChanges();
  }

  /**
   * Set common error base on error
   */
  _setCustomError(error: any) {
    const message = this._setError(error);
    this.error = message;
    this._setErrors(message);
  }

  /**
   * Remove file
   */
  removeFile() {
    this.form.get(this.field.key)?.setValue(null);
    this._clearMessage();
  }
}
