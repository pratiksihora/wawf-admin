import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightFileUploadComponent } from './light-file-upload.component';
import { MultiTypeUploaderModule } from '../../../../standalone/multi-type-uploader/multi-type-uploader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LightFileUploadComponent
  ],
  imports: [
    CommonModule,
    MultiTypeUploaderModule,
    ReactiveFormsModule,
    FormsModule,
    FormErrorModule,
    TranslateModule,
  ],
  exports: [LightFileUploadComponent]
})
export class LightFileUploadModule { }
