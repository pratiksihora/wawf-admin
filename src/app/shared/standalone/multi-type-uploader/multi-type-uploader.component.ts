import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Extrernal Modules
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

// Services
import { FileService } from '../../../../../api/services/common/file/file.service';
import { ToastService } from '../../base/toastr/toast-service/toast.service';

// Utils
import { FileUtil } from '../../../../../_core/utils/form/field';
import { ToastrUtil } from '../../../../../_core/utils/toastr';

// Enums
import { DefaultFile } from '../../../../../constants/enums/core/default-file.enum';
import { AudioUploadTabConstant } from '../audio-uploader/audio-uploader.enum';

// Constants
import { ALLOWED_FILE_TYPES, FILE_SIZE } from '../image-uploader/image-uploader.constant';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-multi-type-uploader',
  templateUrl: './multi-type-uploader.component.html',
  styleUrls: ['./multi-type-uploader.component.scss']
})
export class MultiTypeUploaderComponent implements OnInit {
  @Input() customAPIConfig;
  @Input() closeOnUpdate = false;
  @Input() config: { type: string, category: string };
  // Events
  @Output() closeEvent = new EventEmitter<any>();
  @Output() saveEvent = new EventEmitter<any>();

  // enums
  tabEnum = AudioUploadTabConstant;
  // tabs handle
  currentTab: string = null;

  loading: boolean = false;

  selectedFile: File;
  selectedFileUrl;
  fileName: string = null;
  fileEnum = DefaultFile;
  
  

  /**
   * Subscriptions handle on destroy
   */
  subscriptions: Subscription[] = [];

  constructor(
    public modal: NgbActiveModal,
    public fileService: FileService,
    public cdr: ChangeDetectorRef,
    public toastr: ToastService,
    public modalService: NgbModal, protected translate?: TranslateService
  ) {
    // super(cdr, translate);
    this.currentTab = this.tabEnum.AUDIO_LIBRARY;
  }

  ngOnInit(): void { }

  close() {
    this.modal.close();
    this.closeEvent.emit('close');
  }

  // Tab click for change tabs
  tabClick(tab) {
    this.currentTab = tab;
  }

  validateFileTypeFromUrl(url) {
    const index = ALLOWED_FILE_TYPES.findIndex(type => type === url.slice(-3));
    return index > -1 ? ALLOWED_FILE_TYPES[index] : null;
  }

  async generateFilesFrom3rdParty(event) {
    try {
      this.loading = true;
      let blob = await fetch((environment.bucketAwsUrl + event.url), { headers: { 'X-Requested-With': 'XMLHttpRequest' } }).then(r => r.blob());
      const file = new File([blob], event.filename || `Gamify_${this.config.type}_${new Date().getTime()}.${event.type.split('/')[1]}`, { type: event.type });
      this.selectedFile = file;
      this.selectedFileUrl = event.url;
      this.fileName = event.url.substring(event.url.lastIndexOf('/') + 1);
      this.loading = false;
    } catch (e) {
      if (e) {
        this.loading = false;
        this.toastr.show(ToastrUtil.configureError({ title: 'Failed', message: 'Unable to process image.' }));
        throw e;
      }
    }
  }

  //#endregion

  uploadFile() {
    let fileName = this.selectedFile.name
    // Make form data for file upload.
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append(this.customAPIConfig?.file_name ? this.customAPIConfig?.file_name : 'file_name', fileName);
    formData.append('type', this.config.type);

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
        this.clearFile();
        if (this.closeOnUpdate) {
          this.modal.close({ status: 'CLOSE', name: fileName, url: response?.data?.path });
          return;
        }
        this.clearFile();
      }
    }, err => {
      this.loading = false;
      this.clearFile();
      this.cdr.detectChanges();
    }));
  }

  clearFile() {
    this.selectedFile = null;
    this.fileName = null;
  }

  // Make formData paylaod
  makeFormDataPayload(data: FormData) {
    const customPayload = this.customAPIConfig.payload;
    const customPayloadKeys = Object.keys(customPayload);
    if (customPayloadKeys.length) {
      customPayloadKeys.forEach(key => {
        data.append(key, customPayload[key].toString())
      })
    }
    return data;
  }

  isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  fileChange(file) {
    if (!file || !file[0]) return;

    if (!this.isFileImage(file[0])) {
      // Note: only audio file allowed error message pending
      return;
    }

    if (file[0].size > FILE_SIZE['20_MB']) {
      this.displayErrorToastr('Max file size limit reached (20 MB)');
      return;
    }

    if (!['image/gif', 'image/jpg', 'image/jpeg', 'image/png'].includes(file[0].type)) {
      this.displayErrorToastr('Invalid file type');
      return;
    }

    const reader = new FileReader();
    this.selectedFile = file[0];
    reader.onload = e => { this.selectedFileUrl = reader.result };
    reader.readAsDataURL(this.selectedFile);

    const image = new Image();

    let maxwidth = 20;
    let maxheight = 20;
    let _URL = window.URL || window.webkitURL;
    let imageResolutionExceeded: boolean = false;

    if (this.config?.type === 'Cursor') {

      image.src = _URL.createObjectURL(this.selectedFile);

      image.onload = (e: Event) => {
        if (e && e['path'][0].height && e['path'][0].width) {
          if (e['path'][0].height > maxheight || e['path'][0].width > maxwidth) {
            this.displayErrorToastr(`Please upload ${maxwidth + ' x ' + maxheight} pixel image`);
            this.clearFile();
          }
        }
      }

    }

    this.selectedFile = file[0];
    this.fileName = this.selectedFile.name;
  }

  displayErrorToastr(message = null) {
    this.toastr.show(ToastrUtil.configureError({ title: 'Failed', message: message ? message : 'Unable to process image.' }));
  }

  fileClick(event) {
    this.generateFilesFrom3rdParty(event);
  }

}
