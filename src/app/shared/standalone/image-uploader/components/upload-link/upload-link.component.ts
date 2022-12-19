import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToastrUtil } from '../../../../../_core/utils/toastr';
import { ToastService } from '../../../../base/toastr/toast-service/toast.service';
import { FILE_SIZE, MAX_IMAGE_COUNT } from '../../image-uploader.constant';

@Component({
  selector: 'app-upload-link',
  templateUrl: './upload-link.component.html',
  styleUrls: ['./upload-link.component.scss']
})
export class UploadLinkComponent implements OnInit {

  _currentTab;
  searchString;
  selectedImage: File;
  selectedImageSrc;
  fileSize = FILE_SIZE['20_MB'];

  selectedFolder;
  error = {
    upload: '',
    link: ''
  }

  //Input-Output props
  @Input() type;
  @Input() allowMultipleImages = false;
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'UPLOAD' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
      // this.getImagesCall(true);
    } else if (value?.toUpperCase() === 'LINK' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
    }
  }

  get currentTab() {
    return this._currentTab;
  }

  @Output() imageClicked = new EventEmitter();
  @Output() fileChanged = new EventEmitter();

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    public toastr: ToastService
  ) { }

  ngOnInit(): void {
  }

  openFile() {
    this.fileInput.nativeElement.click();
  }

  /**
  * Reset file tag values
  */
  _clearNativeFile() {
    this.fileInput.nativeElement.value = null;
  }

  _clearMessage() {
    this.error = { link: '', upload: '' };
  }

  //#region Link
  linkClick() {
    if (!this.searchString) {
      // Note Pending validation
      return;
    }

    this.imageClicked.emit({ url: this.searchString, filename: '' });
  }

  // Emit file change events to parent
  emitFileChange(files, event) {
    if(this.allowMultipleImages && files.length > MAX_IMAGE_COUNT.GALLERY) {
      this.displayErrorToastr('ERROR', `Max ${MAX_IMAGE_COUNT.GALLERY} images can be uploaded at once.`);
      return;
    }
    this.fileChanged.emit(files);
    this._clearNativeFile();
  }

  // Display toast message
  displayErrorToastr(type, message = null) {
    if(type === 'ERROR') {
      this.toastr.show(ToastrUtil.configureError({ title: 'Failed', message }));
    }
  }
}
