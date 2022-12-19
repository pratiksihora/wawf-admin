// Angular
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// Services
import { FileService } from 'src/app/api/services/common/file/file.service';
import { ToastService } from '../../base/toastr/toast-service/toast.service';

import { ALLOWED_FILE_TYPES, UPLOAD_EVENTS } from './audio-uploader.constant';

// Enums
import { AudioUploadTabConstant, UplaodAudioErrorConstant } from './audio-uploader.enum';
import { DefaultFile } from 'src/app/constants/enums/core/default-file.enum';

// Utils
import { FileUtil } from '../../../_core/utils/form/field';
import { ToastrUtil } from '../../../_core/utils/toastr';
import { environment } from '../../../../environments/environment';
import { FILE_SIZE } from '../image-uploader/image-uploader.constant';

@Component({
  selector: 'app-audio-uploader',
  templateUrl: './audio-uploader.component.html',
  styleUrls: ['./audio-uploader.component.scss']
})
export class AudioUploaderComponent implements OnInit, OnDestroy {

  @Input() customAPIConfig;
  @Input() closeOnUpdate = false;

  // Events
  @Output() closeEvent = new EventEmitter<any>();
  @Output() saveEvent = new EventEmitter<any>();


  @ViewChild('audioupload') audio: ElementRef;

  // enums
  tabEnum = AudioUploadTabConstant;

  // tabs handle
  currentTab: string = null;

  loading: boolean = false;
  isPlaying = false;

  selectedAudio: File;
  fileName: string = null;
  fileEnum = DefaultFile;
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
    this.currentTab = this.tabEnum.AUDIO_LIBRARY;
  }

  ngOnInit(): void { }

  close() {
    this.stopAudio();
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

  displayErrorToastr(message = null) {
    this.toastr.show(ToastrUtil.configureError({ title: 'Failed', message: message ? message : 'Unable to process audio.' }));
  }

  async generateFilesFrom3rdParty(event) {
    try {
      this.loading = true;
      let blob = await fetch((event.url), { headers: { 'X-Requested-With': 'XMLHttpRequest' }, cache: 'no-cache' }).then(r => {
        return r.blob()
      });
      if (blob) {
        if (blob?.size > FILE_SIZE['5_MB']) {
          this.loading = false;
          this.displayErrorToastr('Max File Size Exceeded (5 MB)');
          return;
        };
        const file = new File([blob], event.filename || `Gamify_Audio_${new Date().getTime()}.${'mp3'}`, { type: 'audio/mp3' });
        this.selectedAudio = file;
        this.fileName = event.url.substring(event.url.lastIndexOf('/') + 1);
        this.loading = false;
      }
    } catch (e) {
      if (e) {
        this.loading = false;
        this.toastr.show(ToastrUtil.configureError({ title: 'Failed', message: 'Unable to process audio.' }));
        throw e;
      }
    }
  }

  //#endregion

  uploadFile() {
    this.stopAudio();
    // Make form data for file upload.
    const formData = new FormData();
    formData.append('file', this.selectedAudio);
    formData.append(this.customAPIConfig?.file_name ? this.customAPIConfig?.file_name : 'file_name', this.selectedAudio.name);

    // get file upload setting
    const payload = this.makeFormDataPayload(formData);
    // this.saveEvent.emit({STATUS: MODAL_STATUS.FILE_SAVE, VALUE: file[0] });

    const apiConfig = FileUtil.configureUploadPayload(this.customAPIConfig.config);
    this.loading = true;
    this.cdr.detectChanges();
    this.subscriptions.push(this.fileService.upload_file(apiConfig, { payload, type: 'Audio' }).subscribe((response: any) => {
      if (response?.succeeded) {
        this.loading = false;
        this.cdr.detectChanges();
        // this.imageClick({ url: response?.file_path, filename: '' });
        if (this.closeOnUpdate) {
          const fileName = this.fileName;
          this.clearFile();
          this.modal.close({ status: 'CLOSE', url: response?.data?.path, name: fileName });
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
    this.selectedAudio = null;
    this.fileName = null;
    this.stopAudio();
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

  isAudioFile(file) {
    return file && file['type'].split('/')[0] === 'audio';
  }

  fileChange(file) {
    if (!file || !file[0]) return;

    if (file[0]?.size > FILE_SIZE['5_MB']) {
      this.loading = false;
      this.displayErrorToastr('Max File Size Exceeded (5 MB)');
      return;
    };

    if (!this.isAudioFile(file[0])) {
      // Note: only audio file allowed error message pending
      return;
    }

    if (this.isAudioFile(file[0])) {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file[0]);
      this.selectedAudio = file[0];
      this.fileName = this.selectedAudio.name;
      audio.onloadedmetadata = () => {
        if (audio.duration > UplaodAudioErrorConstant.MAXIMUMFIVESECONDS) {
          this.loading = false;
          this.displayErrorToastr('Max File Duration Exceeded (' + UplaodAudioErrorConstant.MAXIMUMFIVESECONDS + ' Seconds)');
          this.selectedAudio = null;
          this.fileName = null;
          return;
        }
      };
    };

  }

  audioClick(event) {
    this.generateFilesFrom3rdParty(event);
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }

  playAudio() {
    this.isPlaying = true;
    // Create a blob that we can use as an src for our audio element
    const urlObj = URL.createObjectURL(this.selectedAudio);

    // Set the src and start loading the audio from the file
    this.audio.nativeElement.src = urlObj;
    this.audio.nativeElement.play();
  }

  stopAudio() {
    this.audio.nativeElement.pause();
    this.isPlaying = false;
  }
}

