import { FormControl, FormGroup } from '@angular/forms';

// Enums
import { FileConstant } from 'src/app/constants/enums/controls/file/file-constant.enum';
import { FileType } from 'src/app/constants/enums/controls/file/file-extension.enum';
import { FileIcon } from 'src/app/constants/enums/controls/file/file-icon.enum';
import { FileStatus } from 'src/app/constants/enums/controls/file/file-status.enum';
import { FileValidationType } from 'src/app/constants/enums/controls/file/file-validate-type.enum';

// Interfaces
import { ValidatorOption } from 'src/app/constants/models/controls/form/form-field-config';

export class FileOptionUtil {
  /**
   * @static
   * To set the timezone of the user
   * @param {string} timeZone
   * @returns default timezone or localstorage timezone
   */
  static fileValidators(file: File, validators: ValidatorOption) {
    if (!(file instanceof File) || !validators) return null;

    // check extentions
    if (validators.allowedExtensions?.length) {
      const error = this.fileExtensions(file, validators.allowedExtensions);
      if (error) return error;
    }

    // check file min size
    if (validators.minFileSize) {
      const error = this.fileMinSize(file, (validators.minFileSize * 1024 * 1024));
      if (error) return error;
    }

    // check file max size
    if (validators.maxFileSize) {
      const error = this.fileMaxSize(file, (validators.maxFileSize * 1024 * 1024));
      if (error) return error;
    }

    return null;
  }

  static checkMinFileAllowedFileValidators(file: any, validators: ValidatorOption, currentFiles: number = 0): string | any {
    if (!file || !validators?.minFileAllowed) return null;

    const fileList: Array<any> = Array.from(file);
    // check file min allowed
    return this.fileMinAllowed(fileList.length + currentFiles, validators.minFileAllowed);
  }

  static checkMaxFileAllowedFileValidators(file: any, validators: ValidatorOption, currentFiles: number = 0): string | any {
    if (!file || !validators?.maxFileAllowed) return null;

    const fileList: Array<any> = Array.from(file);
    // check file max allowed
    return this.fileMaxAllowed(fileList.length + currentFiles, validators.maxFileAllowed);
  }

  static fileMinAllowed(files: number, minAllowed: number) {
    if (files >= minAllowed) return null;
    return { type: FileValidationType.MIN_FILE, error: { required: minAllowed, actual: files } };
  };

  static fileMaxAllowed(files: number, maxAllowed: number) {
    if (files <= maxAllowed) return null;
    return { type: FileValidationType.MAX_FILE, error: { required: maxAllowed, actual: files } };
  };

  static fileMinSize(file: File, minSize: number) {
    if (!(file instanceof File) || file.size >= minSize) return null;
    return { type: FileValidationType.MIN_SIZE, error: { requiredSize: minSize, actualSize: file.size, file } };
  };

  static fileMaxSize(file: File, maxSize: number) {
    if (!(file instanceof File) || file.size <= maxSize) return null;
    return { type: FileValidationType.MAX_SIZE, error: { requiredSize: maxSize, actualSize: file.size, file } };
  };

  /**
  * extensions must not contain dot
  */
  static fileExtensions(file: File, allowedExtensions: Array<string>) {
    if (allowedExtensions.length === 0) return null;

    if (file instanceof File) {
      const ext = this.getExtension(file.name);
      if (!ext || !allowedExtensions.find(extn => extn.toLowerCase() === ext.toLowerCase())) {
        return { type: FileValidationType.EXTENTION, error: { allowedExtensions: allowedExtensions, actualExtension: ext, file } };
      }
    }
    return null;
  }

  /**
    * Get default image from extention
    */
  static getDefaultImageBaseOnExtentions(extension?: string): any {
    const match: any = Object.keys(FileType).find((fileType: any) => FileType[fileType as keyof typeof FileType].some((ext: any) => ext === extension));
    if (match === 'IMAGE') {
      return { type: FileIcon.IMAGE, icon: FileConstant.DEFAULT_FILE };
    }
    return { type: FileIcon.ICON, icon: FileConstant[match as keyof typeof FileConstant] ? FileConstant[match as keyof typeof FileConstant] : FileConstant.DEFAULT_FILE };
  }

  /**
  * Convert file size to Mb
  */
  static convertFileSizeToMb(size: number): any {
    return size ? (size / (1024 * 1024)).toFixed(2) : 0
  }

  /**
  * Get filename from full path;
  */
  static getFileName(filename: string): null | string | undefined {
    if (!filename) return '';

    if (filename.indexOf('/') === -1) return filename;

    return filename.split('/').pop();
  }

  static getExtension(filename: string): null | string | undefined {
    if (!filename) return '';
    if (filename.indexOf('.') === -1) {
      return null;
    }
    return filename.split('.').pop();
  }

  /**
 *  Create form group for new file
 */
  static initExisingFile(file: any) {
    return new FormGroup({
      id: new FormControl(file.id),
      extention: new FormControl(file.extension),
      size: new FormControl(file.size),
      name: new FormControl(file.name),
      path: new FormControl(file.path),
      value: new FormControl(file.value),
      image: new FormControl(file.image),
      error: new FormControl(),
      file: new FormControl(null),
      status: new FormControl(FileStatus.UPLOADED),
      progress: new FormControl(100),
      isNew: new FormControl(false),
    })
  }

  static initNewFile(file: any, rNumber: any) {
    const extention: any = this.getExtension(file.name);
    const size = this.convertFileSizeToMb(file.size);
    const extentionType = this.getDefaultImageBaseOnExtentions(extention);
    return new FormGroup({
      id: new FormControl(rNumber),
      extention: new FormControl(extention),
      size: new FormControl(size),
      name: new FormControl(file.name),
      path: new FormControl(),
      type: new FormControl(extentionType.type),
      icon: new FormControl(extentionType.icon),
      error: new FormControl(),
      file: new FormControl(file),
      status: new FormControl(FileStatus.IN_PROGRESS),
      progress: new FormControl(0),
      isNew: new FormControl(true),
    })
  }

  static dataURItoFile(dataURI, file) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    let blob = new Blob([new Uint8Array(array)], { type: file.type });
    return new File([blob], file.name, { type: file.type });
  }
}