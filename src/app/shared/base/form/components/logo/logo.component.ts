import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules

import { TranslateService } from '@ngx-translate/core';

// Components
import { FormFileBaseComponent } from '../../base-class/form-base/form-file-base.component';
import { ImageCroppedEvent, ImageTransform } from 'src/app/libraries/ngx-image-cropper/src';
import { FileOptionUtil } from 'src/app/_core/utils/form/file';
import { FormControl } from '@angular/forms';

//constants
import { DefaultImage } from 'src/app/constants/enums/core/default-image.enum';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent extends FormFileBaseComponent implements OnInit {
  croppedEvent: any = null;
  type: any = 'jpeg';
  canvasRotation = 0;
  loading = false;
  scale = 1;
  aspectRatio = 9 / 3;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  coordinates = { x: 0 };
  imageEnum = DefaultImage;

  cropperOptions;
  logoFileKey;
  constructor(
    
    public cdr: ChangeDetectorRef,
    public translate: TranslateService) {
    super( cdr, translate);
  }

  _setupLogo(): void {
    this.logoFileKey = this._getLogoKey();
    this.form.addControl(this.logoFileKey, new FormControl(''));
  }

  /**
    * Get file upload control key if not passed from configuration
    */
  _getLogoKey() {
    return `${this.field.key}_file`;
  }

  /**
  * To open file upload native modal
  */
  openFile() {
    this.fileInput.nativeElement.click();
  }

  /**
   * Emits the event when any file selected
   * @param - event for selected file
   */
  fileChange(files: any, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // validate file extar validations
    const error = FileOptionUtil.fileValidators(files, this.validators);
    if (error) {
      this._setCustomError(error);
      this._clearNativeFile();
      return;
    }
    if (!files.length) return;

    this.type = files[0].type.split('/')[1];
    this.cropperOptions = { file: { target: { files } } };
    this.form.get(this.logoFileKey).patchValue({ type: files[0].type, name: files[0].name });
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
    this.cropperOptions = null;
    this.form.get(this.controlKey)?.setValue(null);
    this.form.get(this.logoFileKey).setValue(null);
    this._clearNativeFile();
    this._clearMessage();
  }

  // cropper events
  mousewheelHandler(event: any) {
    var oEvent = event,
      delta = oEvent.deltaY || oEvent.wheelDelta;
    if (delta > 0) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.loading = false;
    this.form.get(this.controlKey).patchValue(event.base64);
  }

  resetImage() {
    this.scale = 1;
    this.canvasRotation = 0;
    this.transform = {
    };
  }

  zoomOut(isClick = false) {
    let scale = this.scale;
    if (scale >= 0.05) {
      // scale -= .08;
      isClick ? scale -= .15 : scale -= 0.08;
      this.transform = {
        ...this.transform,
        scale: scale
      };
      this.scale = scale;
    }
  }

  zoomIn(isClick = false) {
    let scale = this.scale;
    // scale += .08;
    isClick ? scale += .15 : scale += 0.08;
    this.transform = {
      ...this.transform,
      scale: scale
    };
    this.scale = scale;
  }
}
