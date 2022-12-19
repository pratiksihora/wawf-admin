import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { LoaderModule } from '../../../loader/loader/loader.module';
import { BaseModalModule } from '../../../modal/base-modal/base-modal.module';

// Components
import { ImageUploadComponent } from './image-upload.component';
import { ImageCroperComponent } from './image-croper/image-croper.component';

@NgModule({
  declarations: [ImageUploadComponent, ImageCroperComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    NgbTooltipModule,
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule,
    LoaderModule,
    BaseModalModule,
  ],
  exports: [ImageUploadComponent, ImageCroperComponent],
  entryComponents: [
    ImageUploadComponent,
    ImageCroperComponent
  ]
})
export class ImageUploadModule { }
