import { ValidatorFn, FormControl } from '@angular/forms';

export class FileValidator {

  /**
    * Call this function to get the validator function for file max size check
    * @static
    * @returns validator function
    */
  static fileMaxSize(maxSize: number): any {
    const validatorFn: any = (file: File) => {
      if (file instanceof File && file.size > maxSize) {
        return { fileMinSize: { requiredSize: maxSize, actualSize: file.size, file } };
      }
    };
    return FileValidator.fileValidation(validatorFn);
  }

  /**
    * Call this function to get the validator function for file min size check
    * @static
    * @returns validator function
    */
  static fileMinSize(minSize: number): ValidatorFn {
    const validatorFn: any = (file: File) => {
      if (file instanceof File && file.size < minSize) {
        return { fileMinSize: { requiredSize: minSize, actualSize: file.size, file } };
      }
    };
    return FileValidator.fileValidation(validatorFn);
  }

  /**
   * extensions must not contain dot
   */
  static fileExtensions(allowedExtensions: Array<string>): any {
    const validatorFn: any = (file: File) => {
      if (allowedExtensions.length === 0) {
        return null;
      }

      if (file instanceof File) {
        const ext: any = FileValidator.getExtension(file.name);
        if (allowedExtensions.indexOf(ext) === -1) {
          return { fileExtension: { allowedExtensions: allowedExtensions, actualExtension: file.type, file } };
        }
      }
    };
    return FileValidator.fileValidation(validatorFn);
  }

  private static getExtension(filename: string): any {
    if (filename.indexOf('.') === -1) {
      return null;
    }
    return filename.split('.').pop();
  }

  private static fileValidation(validatorFn: (File: any) => null | object): any {
    return (formControl: FormControl) => {
      if (!formControl.value) {
        return null;
      }

      const files: File[] = [];
      const isMultiple = Array.isArray(formControl.value);
      isMultiple
        ? formControl.value.forEach((file: File) => files.push(file))
        : files.push(formControl.value);

      for (const file of files) {
        return validatorFn(file);
      }

      return null;
    };
  }

}