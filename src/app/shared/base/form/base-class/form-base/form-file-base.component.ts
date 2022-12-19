import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";

// Components
import { FormBaseComponent } from "./form-base.component";

// Constants
import { FILE_API_ACTION } from "src/app/constants/common-constants/file-api";
import { FileValidationType } from "src/app/constants/enums/controls/file/file-validate-type.enum";

/**
 * Common form class for handle form control options and methods
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 03/03/2022 (Pratik Shihora <pratik@saeculumsolutions.com>) form base class created
 */
@Component({ template: '' })
export abstract class FormFileBaseComponent extends FormBaseComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  controlKey: string = '';
  error: string | any = ''
  loading: boolean = false;

  /**
   *  Set file hidden upload control after main control set
   */
  _setupAfterControlIntialize() {
    this.controlKey = this._getFileUploadKey();
    this.form.addControl(this.controlKey, new FormControl(''));
    this._setupLogo();
  }

  /**
   *  Set file hidden upload control after main control set for logo
   */
  _setupLogo() {
  }

  /**
   * Get file upload control key if not passed from configuration
   */
  _getFileUploadKey() {
    return this.field.fileOptions?.controlKey || `${this.field.key}_upload`;
  }

  /**
  * Get file upload config upload file
  */
  _getUploadApiConfig() {
    if (this.field.api) return {
      ...this.field.api, response: (response: any) => {
        return { file_name: response.data.fileName, file_path: response.data.path }
      }
    };
    return FILE_API_ACTION;
  }

  /**
   * Reset extra validations error message and set default validations 
   */
  _clearMessage() {
    this.error = null;
    this.setValidations(this.form, this.field, this.validators, this.messages);
  }

  /**
   * Reset file tag values
   */
  _clearNativeFile() {
    this.fileInput.nativeElement.value = null;
  }

  /**
* Set error base on error type or ser default validations
*/
  _setError(error: any = { type: '', message: '' }): any {
    if (!error) return;

    switch (error.type) {
      case FileValidationType.EXTENTION:
        return this.translate?.instant((this.messages?.allowedExtensions || 'ERROR.VALIDATION.ALLOWED_EXTENSIONS'), { allowedExtensions: this.validators.allowedExtensions.join(', ') });
      case FileValidationType.MIN_FILE:
        return this.translate?.instant((this.messages?.minFileAllowed || 'ERROR.VALIDATION.MIN_FILE_ALLOWED'), { minFileAllowed: this.validators.minFileAllowed });
      case FileValidationType.MAX_FILE:
        return this.translate?.instant((this.messages?.maxFileAllowed || 'ERROR.VALIDATION.MAX_FILE_ALLOWED'), { maxFileAllowed: this.validators.maxFileAllowed });
      case FileValidationType.MIN_SIZE:
        return this.translate?.instant((this.messages?.minFileSize || 'ERROR.VALIDATION.MIN_FILE_SIZE'), { minFileSize: this.validators.minFileSize });
      case FileValidationType.MAX_SIZE:
        return this.translate?.instant((this.messages?.maxFileSize || 'ERROR.VALIDATION.MAX_FILE_SIZE'), { maxFileSize: this.validators.maxFileSize });
      case FileValidationType.SERVER_ERROR:
        return error.message;
      default:
        return;
    }
  }
}