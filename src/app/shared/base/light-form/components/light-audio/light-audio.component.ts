import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

// External Modules
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from "@ngx-translate/core";

// Components
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';
import { AudioUploaderComponent } from '../../../../standalone/audio-uploader/audio-uploader.component';

// Constants
import { DefaultFile } from '../../../../../constants/enums/core/default-file.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-light-audio',
  templateUrl: './light-audio.component.html',
  styleUrls: ['./light-audio.component.scss']
})
export class LightAudioComponent extends LightFormBaseComponent implements OnInit, OnDestroy {

  fileEnum = DefaultFile;
  isPlaying = false;
  
  
  @ViewChild('lightaudio') audio: ElementRef;
  constructor(private modalService: NgbModal, protected cdr?: ChangeDetectorRef, protected translate?: TranslateService) {
    super(cdr, translate);
  }

  openImageUploader() {
    const payload = {
      type: this.fieldConfig.api.storage || 'audio'
    }

    const modalRef = this.modalService.open(AudioUploaderComponent, { centered: true, backdrop: 'static', scrollable: true, size: 'xl' });
    modalRef.componentInstance.closeOnUpdate = true;
    modalRef.componentInstance.customAPIConfig = { config: this.field.api, payload, file_name: 'name' };
    modalRef.result.then(res => {
      if (res) {
        this.form?.get(this.field.key)?.setValue(res);
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      }
    });
  }

  removeAudio() {
    this.audio.nativeElement.src = null;
    this.form.get(this.field.key)?.setValue(null);
    this.form.get(this.field.key).updateValueAndValidity();
  }

  playAudio() {
    if (this.form.get(this.field.key)?.value?.url) {
      this.audio.nativeElement.src = (this.bucketAwsUrl + this.form.get(this.field.key)?.value?.url);
      this.audio.nativeElement.play();
      this.isPlaying = true;
    }
  }

  stopAudio() {
    this.audio.nativeElement.pause();
    this.isPlaying = false;
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }
}
