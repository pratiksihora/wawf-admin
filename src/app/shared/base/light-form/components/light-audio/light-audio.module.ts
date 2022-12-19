
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

// Components
import { LightAudioComponent } from './light-audio.component';
import { AudioUploaderModule } from '../../../../standalone/audio-uploader/audio-uploader.module';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [
    LightAudioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*** EXTERNAL MODULES */
    TranslateModule,
    /*** INTERNAL MODULES */
    FormErrorModule,
    AudioUploaderModule,
    InlineSVGModule,
  ],
  exports: [LightAudioComponent]
})
export class LightAudioModule { }
