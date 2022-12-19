import { ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

// External Modules
import { TranslateService } from "@ngx-translate/core";
import { NgxPermissionsService } from "ngx-permissions";
import { forkJoin, Observable } from "rxjs";

// Services
import { FileService } from "src/app/api/services/common/file/file.service";

// Components
import { FormFileBaseComponent } from "./form-file-base.component";

// Interfaces and Enums
import { FileOptionUtil } from "src/app/shared/_core/utils/form/file";
import { FileStatus } from "src/app/shared/constants/enums/controls/file/file-status.enum";
import { FileIcon } from 'src/app/shared/constants/enums/controls/file/file-icon.enum';

/**
 * Common form class for handle form control options and methods
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 03/03/2022 (Pratik Shihora <pratik@saeculumsolutions.com>) form base class created
 */
@Component({ template: '' })
export abstract class FormMultipleFileBaseComponent extends FormFileBaseComponent implements OnInit, OnDestroy {
  clear: boolean = false;
  fileIconEnum = FileIcon;
  fileStatusEnum = FileStatus;

  constructor(public permissionService: NgxPermissionsService,
    public cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public fileService: FileService) {
    super(permissionService, cdr, translate);
  }

  /**
   * @param {number} index index at which file is required
   * @returns file at given index
   */
  getFileFormGroupAtIndex(id: number) {
    const index = this.getFormArray().value.findIndex((item: any) => item.id === id);
    if (index === -1) return null;
    return (this.getFormArray().controls[index] as FormGroup);
  }

  /**
  * Add Control
  */
  _addFormControl() {
    const options = this._getFileValues().map((option: any) => FileOptionUtil.initExisingFile(option));
    this.form.addControl(this.field.key, new FormArray(options));
    this.form.addControl(`${this.field.key}_hidden`, new FormControl(this.hidden?.value));
  }

  /**
    * get file values
    */
  _getFileValues() {
    const defaultValue = this.field.defaultValue !== undefined ? this.field.defaultValue : null;
    if (!this.field.prepareOptions) return this.field?.options || [];
    return this.field.prepareOptions({ values: this.values || defaultValue });
  }

  /**
   * To open file upload native modal
   */
  openFile() {
    this.fileInput.nativeElement.click();
  }

  /**
    * remove old files and add new values
    * @param - event for selected file
    */
  ngOnChanges(changes: SimpleChanges) {
    if (this.field && changes?.values?.currentValue !== undefined && this.form?.get(this.field.key)) {
      this._reFillFiles();
    }

    if (changes.fieldConfig?.currentValue !== undefined || changes.formConfig?.currentValue !== undefined) {
      this._configureField();
    }
  }

  _reFillFiles() {
    this.removeAllFile();
    (this.values || []).map((value: any) => this.getFormArray().push(FileOptionUtil.initExisingFile(value)));
  }

  /**
  * Emits the event when any file selected
  * @param - event for selected file
  */
  fileChange(file: any) {
    this._clearMessage();
    if (!file) return;

    // validate min file extra validations
    const minError = this._setMinFileValidation(file);
    if (!minError) {
      // check for max file validations
      const error = FileOptionUtil.checkMaxFileAllowedFileValidators(file, this.validators, this.getFormArray().value.length);
      if (error) {
        // set error
        this._setCustomError(error);
        this._clearNativeFile();
        return;
      }
    }
    // upload all files if no error occured
    this.uploadAllFiles(file);
  }

  /**
  * Create Formgroup for the newly added files.
  */
  uploadAllFiles(fileList: any) {
    this.loading = true;
    const files$ = Array.from(fileList).map((file: any) => {
      return Observable.create((observer: any) => {
        const rNumber = Math.floor((Math.random() * 1000000) + 1);
        this.getFormArray().push(FileOptionUtil.initNewFile(file, rNumber));
        this.uploadFile(file, rNumber, observer);
      });
    })
    this.subscriptions.push(forkJoin(files$).subscribe(() => {
      this.loading = false;
      this._clearNativeFile();
    }));
  }

  /**
    * Upload file in server and validate and reset
    */
  uploadFile(file: any, id: number, observer: any) {
    const control = this.getFileFormGroupAtIndex(id);
    // validate file extra validations
    const error = FileOptionUtil.fileValidators(file, this.validators);
    if (error) return this._updateControl(control, observer, 0, FileStatus.FAILED, this._setError(error));

    // Make form data for file upload.
    const formData = new FormData();
    formData.append('file', file);
    // get file upload setting
    this.subscriptions.push(this.fileService.uploadFile(this._getUploadApiConfig(), formData).subscribe((response: any) => {
      if (response.status === 'progress' && control) this._updateControl(control, observer, response.progress);
      else if (response?.file_path) {
        control?.get('path')?.setValue(response?.file_path);
        this._updateControl(control, observer, 100, FileStatus.UPLOADED)
      }
    }, err => {
      this._updateControl(control, observer, 0, FileStatus.FAILED, err?.error?.message || this._uploadError())
    }));
  }

  /**
   * Update control while 
   */
  _updateControl(control: any, observer: any, progress: number = 0, status: string = FileStatus.IN_PROGRESS, message?: string) {
    control.get('progress').setValue(progress);
    control.get('status').setValue(status);
    if (status === FileStatus.FAILED) {
      control.get('error').setValue(message);
      control.get('name').setErrors({ message });
    }
    if (status === FileStatus.FAILED || status === FileStatus.UPLOADED) {
      observer.next({});
      observer.complete();
    }
    this.cdr.detectChanges();
  }

  /**
   *  validate min file extra validations
   */
  _setMinFileValidation(file = []) {
    // validate file extra validations
    const minError = FileOptionUtil.checkMinFileAllowedFileValidators(file, this.validators, this.getFormArray().value.length);
    if (!minError) return null;
    this._setCustomError(minError, false);
    return minError;
  }

  /**
  * Set common error base on error
  */
  _setCustomError(error?: string, clear?: boolean) {
    const message = this._setError(error);
    this.error = message;
    this.clear = clear || false;
    this._setErrors(message);
  }

  /**
 * @param {*} file file to be deleted
 */
  _deleteItem(index: number) {
    this.getFormArray().removeAt(index);
  }

  /**
   * Remove file
   */
  clickFile(event?: any) {
    event?.stopPropagation();
    event?.preventDefault();
  }

  /**
 * Remove file
 */
  removeFile(index: any, event?: any) {
    event?.stopPropagation();
    event?.preventDefault();
    this._deleteItem(index);
    this._clearMessage();
    this._setMinFileValidation([]);
  }

  /**
   * Remove all file
   */
  removeAllFile(event?: any) {
    event?.stopPropagation();
    event?.preventDefault();
    this._clearFormArray();
    this._setMinFileValidation([]);
  }

  /**
    * Set error base on error type or ser default validations
    */
  public _uploadError(): any {
    return this.translate.instant('ERROR.VALIDATION.FILE_UPLOAD');
  }
}