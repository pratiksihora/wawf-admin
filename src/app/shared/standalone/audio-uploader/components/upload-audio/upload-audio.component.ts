import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-upload-audio',
  templateUrl: './upload-audio.component.html',
  styleUrls: ['./upload-audio.component.scss']
})
export class UploadAudioComponent implements OnInit {
  url;
  error = {
    upload: '',
    link: ''
  }

  //Input-Output props
  @Input() type;

  _currentTab;
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'UPLOAD' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
    } else if (value?.toUpperCase() === 'LINK' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
    }
  }

  get currentTab() {
    return this._currentTab;
  }

  @Output() audioClick = new EventEmitter();
  @Output() fileChanged = new EventEmitter();

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor() { }

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
    if (!this.url) {
      // Note Pending validation
      return;
    }
    this.audioClick.emit({ url: this.url, filename: '' });
  }
}
