

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// External Modules
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Internal Modules
import { LoaderModule } from '../../base/loader/loader/loader.module';
import { NoRecordFoundModule } from '../../base/no-record-found/no-record-found.module';

// Components
import { UploadAudioComponent } from './components/upload-audio/upload-audio.component';
import { AudioUploaderComponent } from './audio-uploader.component';
import { AudioLibraryComponent } from './components/audio-library/audio-library.component';
import { AudioPreviewComponent } from './components/audio-preview/audio-preview.component';


@NgModule({
  declarations: [
    AudioUploaderComponent,
    UploadAudioComponent,
    AudioLibraryComponent,
    AudioPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    NgbModalModule,
    TranslateModule.forChild(),
    InlineSVGModule,
    NoRecordFoundModule,
    /*** CUSTOM MODULES ***/
    LoaderModule,
    NgbTooltipModule
  ],
  exports: [
    AudioUploaderComponent,
  ]
})
export class AudioUploaderModule { }
