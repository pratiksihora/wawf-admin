// Angular
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// Services
import { FileService } from 'src/app/api/services/common/file/file.service';
import { ToastService } from '../../base/toastr/toast-service/toast.service';

// Constants
import { ALLOWED_FILE_TYPES, FILE_SIZE } from './image-uploader.constant';

// Utils
import { FileUtil } from '../../../_core/utils/form/field';
import { ToastrUtil } from '../../../_core/utils/toastr';

// Enums
import { ImageUploadTabConstant } from './image-uploader.enum';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Input() customAPIConfig;
  @Input() uploadCallback = false;
  @Input() closeOnUpdate = false;

  // Events
  @Output() closeEvent = new EventEmitter<any>();
  @Output() saveEvent = new EventEmitter<any>();

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  // enums
  tabEnum = ImageUploadTabConstant;

  // tabs handle
  currentTab: string = null;

  // prevent unwanted api call
  loaded: any = { upload: true, link: true };

  loading: boolean = false;
  imageList: any = { giphy: [], tenor: [], pexels: [], unsplash: [], pixabay: [] };
  selectedImage: File;
  selectedImageSrc;
  searchString = '';
  allowMultipleImages = false;
  multipleImages = [];
  
  

  /**
   * Subscriptions handle on destroy
   */
  subscriptions: Subscription[] = [];

  constructor(
    public modal: NgbActiveModal,
    public fileService: FileService,
    private cdr: ChangeDetectorRef,
    public toastr: ToastService
  ) {
    this.currentTab = this.tabEnum.UPLOAD;
  }

  ngOnInit(): void { }

  close() {
    this.modal.close();
    this.closeEvent.emit('close');
  }

  // Tab click for change tabs
  tabClick(tab) {
    this.currentTab = tab;
    // skip if already loaded
    if (this.loaded[tab]) return;
    // fetch images
  }

  imageClick(event) {
    this.loading = true;
    const type = event?.provider?.toLowerCase() || 'custom';
    switch (type) {
      case this.tabEnum.GIPHY:
        this.generateFilesFrom3rdParty(event, 'gif');
        break;
      case this.tabEnum.TENOR:
        this.generateFilesFrom3rdParty(event, 'gif');
        break;
      case this.tabEnum.GALLARY:
        event.url = environment.bucketAwsUrl + event.url;
        this.generateFilesFrom3rdParty(event, event?.type.split('/')[1]);
        break;
      case this.tabEnum.PEXELS:
        this.generateFilesFrom3rdParty(event, event?.url.split('/').pop().split('.')[1]);
        break;
      case this.tabEnum.UNSPLASH:
        const type = new URLSearchParams(event?.url).get('fm');
        this.generateFilesFrom3rdParty(event, type || 'jpg');
        break;
      case this.tabEnum.PIXABAY:
        this.generateFilesFrom3rdParty(event, event?.url.split('/').pop().split('.')[1]);
        break;
      case 'custom':
        const validType = this.validateFileTypeFromUrl(event.url)
        // if (validType === null) {
        //   this.displayErrorToastr('Invalid File Type');
        //   this.loading = false;
        //   return;
        // }
        this.generateFilesFrom3rdParty(event, validType ? validType : 'jpeg');
        break;
      default:
        break;
    }
  }

  validateFileTypeFromUrl(url) {
    const index = ALLOWED_FILE_TYPES.findIndex(type => type === url.slice(-3));
    return index > -1 ? ALLOWED_FILE_TYPES[index] : null;
  }

  async generateFilesFrom3rdParty(event, type) {
    try {
      let blob = await fetch(event.url).then(r => {
        if (r.status !== 200) throw 'Error';
        return r.blob()
      });
      if (blob) {
        if (blob?.size > FILE_SIZE['20_MB']) {
          this.loading = false;
          this.displayErrorToastr('Max File Size Exceeded (20 MB)');
          return;
        };

        if (blob && (blob.type.includes('image') || (blob.type === 'text/plain'))) {

          this.selectedImage = await this.fileService.compressImageFile(blob, { type, name: event.filename || `Gamify_${new Date().getTime()}.${type}`});
          this.selectedImageSrc = event.url;
          this.loading = false;
        } else {
          this.displayErrorToastr('Invalid file type or link');
        }
        this.loading = false;
      }
    } catch (e) {
      if (e) {
        this.loading = false;
        this.displayErrorToastr();
        throw e;
      }
    }
  }

  //#endregion

  displayErrorToastr(message = null) {
    this.toastr.show(ToastrUtil.configureError({ title: 'Failed', message: message ? message : 'Unable to process image.' }));
  }

  // Gallery
  isFolder: boolean = true;
  isFile: boolean = false;

  uploadLoadedFile() {
    // Make form data for file upload.
    const formData = new FormData();

    formData.append('file', this.selectedImage);
    formData.append(this.customAPIConfig?.file_name ? this.customAPIConfig?.file_name : 'file_name', this.selectedImage.name);

    // get file upload setting
    const payload = this.makeFormDataPayload(formData);
    // this.saveEvent.emit({STATUS: MODAL_STATUS.FILE_SAVE, VALUE: file[0] });

    const apiConfig = FileUtil.configureUploadPayload(this.customAPIConfig.config);
    this.loading = true;
    this.cdr.detectChanges();
    this.subscriptions.push(this.fileService.upload_file(apiConfig, { payload, type: 'Image' }).subscribe((response: any) => {
      if (response?.succeeded) {
        this.loading = false;
        this.cdr.detectChanges();
        // this.imageClick({ url: response?.file_path, filename: '' });
        if (this.closeOnUpdate) {
          const fileUrl = this.selectedImageSrc;
          this.clearFileSelection();
          this.modal.close({
            status: 'CLOSE', url: fileUrl, bucketUrl: response?.data?.path
          });
          return;
        }
        this.clearFileSelection();
        // this.modal.close({ status: modalPopupEvents.CLOSE });
      }
    }, err => {
      this.loading = false;
      this.clearFileSelection();
      this.cdr.detectChanges();
      // Note: Pending error handling
      // err?.error?.message
      this.displayErrorToastr(err?.error?.message || '');
    }));
  }

  filterImages() {
  }

  clearFileSelection() {
    this.selectedImage = null;
    this.selectedImageSrc = null;
  }

  //#region Third Party Api Integration

  fetchThirdPartyImages(tab) {
    this.loaded[tab] = true;
    switch (tab) {
      case this.tabEnum.GALLARY:
        break;
      default:
        return `Unhandled event: ${tab}`;
    }
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

  isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  fileChange(files) {
    if (!this.allowMultipleImages) {
      if (!files) return;

      if (!this.isFileImage(files[0])) {
        // Note: only image file allowed error message pending
        return;
      }

      if (files[0].size > FILE_SIZE['20_MB']) {
        this.displayErrorToastr('Max file size limit reached (20 MB)');
        return;
      }

      if (!['image/gif', 'image/jpg', 'image/jpeg', 'image/png'].includes(files[0].type)) {
        this.displayErrorToastr('Invalid file type');
        return;
      }

      const reader = new FileReader();
      this.selectedImage = files[0];
      reader.onload = e => this.selectedImageSrc = reader.result;
      reader.readAsDataURL(this.selectedImage);

      return;
    }

    Array.from(files).forEach((file: File) => {
      if (!file) return;

      if (!this.isFileImage(file)) {
        // Note: only image file allowed error message pending
        return;
      }

      if (file.size > FILE_SIZE['20_MB']) {
        this.displayErrorToastr(`Max file size limit reached 20 MB. (${file.name})`);
        return;
      }

      if (!['image/gif', 'image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
        this.displayErrorToastr(`Invalid file type (${file.name})`);
        return;
      }

      const reader = new FileReader();
      this.selectedImage = file;
      reader.onload = e => {
        this.multipleImages.push({ name: file.name, size: file.size, data: reader.result, file: file, type: file.type });
      }
      reader.readAsDataURL(file);

    })
  }


  handleMultipleImage(images) {
    this.multipleImages = [...images];
    this.selectedImage = images[0] || null;
    images.forEach(image => {
    })
  }

}

