import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileService } from '../../../../../../../api/services/common/file/file.service';
import { FileStatus } from '../../../../../../../constants/enums/controls/file/file-status.enum';
import { ConfirmModalConfig } from '../../../../../../../constants/models/controls/modal/confirm-modal';
import { FileUtil } from '../../../../../../../_core/utils/form/field/file.util';
import { ToastrUtil } from '../../../../../../../_core/utils/toastr';
import { ConfirmModalComponent } from '../../../../base/modal/confirm-modal/confirm-modal.component';
import { ToastService } from '../../../../base/toastr/toast-service/toast.service';
import { FILE_SIZE, MAX_IMAGE_COUNT } from '../../image-uploader.constant';

//component
import { MultiImagePreviewComponent } from '../multi-image-preview/multi-image-preview.component';
import { GALLERY_LIMIT_REACHED, GALLERY_MAX_LIMIT_REACHED_TEXT } from './multi-image-upload.constant';

@Component({
  selector: 'app-multi-image-upload',
  templateUrl: './multi-image-upload.component.html',
  styleUrls: ['./multi-image-upload.component.scss']
})
export class MultiImageUploadComponent implements OnInit, OnDestroy {

  // User define var
  hello: any = [];
  subscriptions: Subscription[] = [];
  imagesUploaded = null;
  MAX_IMAGE_UPLOAD_COUNT = +MAX_IMAGE_COUNT.GALLERY;

  // Input-Output Props
  @Input() imagesrc;
  @Input() selectedImages;
  @Input() customAPIConfig;

  @Output() multipleImageCallback = new EventEmitter();

  // Child
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastService,
    private fileService: FileService,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
  }

  viewImage(data) {
    const modalRef = this.modalService.open(MultiImagePreviewComponent, { centered: true, size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.image = data;
  }

  deleteImage(index) {
    this.selectedImages.splice(index, 1);
  }

  clearFileSelection(redirect = false, done = false) {

    this.imagesUploaded = null;
    if (!this.selectedImages?.length || done) {
      this.selectedImages = [];
      if (redirect) {
        this.multipleImageCallback.emit(this.selectedImages);
      }
      return;
    }

    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static', size: 'md' });
    (modalRef.componentInstance.options as ConfirmModalConfig) = { type: 'danger', title: 'Campaign', icon: 'bi bi-trash me-3', message: 'All your changes will be gone. Are you sure?', button1: true, button1Text: 'Confirm', button2: true, button2Text: 'Cancel', button1Class: 'btn btn-danger' }
    modalRef.result.then(res => {
      if (res === 'Confirm') {
        this.selectedImages = [];
        this.imagesUploaded = null;
        // Clearing subscription if any
        this.subscriptions.forEach(res => res.unsubscribe());
        if (redirect) {
          this.multipleImageCallback.emit(this.selectedImages);
        }
      }
    })
  }

  isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  displayToastr(title = 'Failed', message = null) {
    const config = { title, message: message ? message : 'Unable to process image.' };
    this.toastr.show(title === 'Failed' ? ToastrUtil.configureError(config) : ToastrUtil.configureInfo(config));
  }

  emitFileChange(files) {

    let fileArray = Array.from(files);

    if ((fileArray.length + this.selectedImages.length) > this.MAX_IMAGE_UPLOAD_COUNT) {
      this.displayToastr('Info', `You can choose upto ${this.MAX_IMAGE_UPLOAD_COUNT} files max`);
      fileArray = fileArray.slice(0, (this.MAX_IMAGE_UPLOAD_COUNT - this.selectedImages.length));
    }

    fileArray.forEach((file: File) => {
      if (!file) return;

      if (!this.isFileImage(file)) {
        // Note: only image file allowed error message pending
        return;
      }

      if (file.size > FILE_SIZE['20_MB']) {
        this.displayToastr('Failed', `Max file size limit reached 20 MB. (${file.name})`);
        return;
      }

      if (!['image/gif', 'image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
        this.displayToastr('Failed', `Invalid file type (${file.name})`);
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        this.selectedImages.push({ name: file.name, size: file.size, data: reader.result, file, type: file.type });
      }
      reader.readAsDataURL(file);

    })

  }

  uploadImages() {
    this.selectedImages.length && this.recurssiveUpload(0);
  }

  recurssiveUpload(index) {
    this.imagesUploaded = false;
    const file$ = Observable.create((observer: any) => {
      let fileData = this.selectedImages[index];
      const rNumber = Math.floor((Math.random() * 1000000) + 1);
      fileData.id = rNumber;
      this.uploadFile(fileData, rNumber, observer);
    })

    this.subscriptions.push((file$).subscribe((res) => {
      index++;
      if (this.selectedImages.length === index) {
        this.imagesUploaded = true;
        const imageStats = this.getImageUploadStats();
        this.displayToastr('Info', `${imageStats.success ? (imageStats.success + ' Image uploaded successfully. ') : ''} ` + `${imageStats.failed ? (imageStats.failed + ' Image upload failed.') : ''}`)
        this.cdr.detectChanges();
        return
      }

      if (res.message !== GALLERY_LIMIT_REACHED) {
        this.recurssiveUpload(index);
        return;
      }
      this.handledGalleryLimitReachError(res, index);
    }));
  }

  getImageUploadStats() {
    let success = 0;
    let failed = 0;
    this.selectedImages.forEach(image => {
      image.status === 'failed' ? failed++ : success++
    });
    return { success, failed };
  }

  // Handling gallery limit reached.
  handledGalleryLimitReachError(res, index) {
    const limit = this.selectedImages.length;
    this.displayToastr('Failed', res.message);
    for (let ind = index; ind < limit; ind++) {
      this.selectedImages[ind].status = 'failed';
      this.selectedImages[ind].error = GALLERY_MAX_LIMIT_REACHED_TEXT;
    }
    this.imagesUploaded = true;
    const imageStats = this.getImageUploadStats();
    this.displayToastr('Info', `${imageStats.success ? (imageStats.success + ' Image uploaded successfully.') : ''}` + `${imageStats.failed ? (imageStats.failed + ' Image upload failed.') : ''}`);
    this.cdr.detectChanges();
  }

  // Make formData paylaod
  makeFormDataPayload(data: FormData) {
    const customPayload = this.customAPIConfig.payload;

    const customPayloadKeys = Object.keys(customPayload);
    if (customPayloadKeys.length) {
      customPayloadKeys.forEach(key => {
        data.append(key, customPayload[key]?.toString())
      })
    }
    return data;
  }

  async uploadFile(fileData, id, observer) {

    const formData = new FormData();

    const file = await this.fileService.compressImageFile(fileData.data, { type: fileData.type.split('/')[1], name: fileData.name }, false);

    formData.append('file', file);
    formData.append(this.customAPIConfig?.file_name ? this.customAPIConfig?.file_name : 'file_name', fileData.file.name);

    const apiConfig = FileUtil.configureUploadPayload({ ...this.customAPIConfig.config, response: () => ({ success: true }) });
    const payload: FormData = this.makeFormDataPayload(formData);

    // return this.fileService.uploadFile(apiConfig, payload);

    this.subscriptions.push(this.fileService.uploadFile(apiConfig, payload, { reportProgress: true, observe: 'events', hideToast: true }).subscribe((response: any) => {
      if (response?.status === 'progress') {
        this.selectedImages.find(image => image.id === id).progress = response?.progress;
        this._updateControl(fileData, observer, response.progress);
      }
      else if (response?.success) {
        this._updateControl(fileData, observer, 100, FileStatus.UPLOADED)
      }
    }, err => {
      this._updateControl(fileData, observer, 0, FileStatus.FAILED, err?.error?.message || this._uploadError())
    }));
  }

  _updateControl(fileData, observer, progress, status: string = FileStatus.IN_PROGRESS, message?: string) {
    fileData.progress = progress;
    fileData.status = status;
    fileData.error = message;

    if (status === FileStatus.FAILED) {
      observer.next({ fileData, message });
      observer.complete();
    }

    if (status === FileStatus.UPLOADED) {
      observer.next({});
      observer.complete();
    }
    this.cdr.detectChanges();
  }

  addMore() {
    this.fileInput.nativeElement.click();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
    * Set error base on error type or ser default validations
    */
  public _uploadError(): any {
    return 'Error';
  }
}
