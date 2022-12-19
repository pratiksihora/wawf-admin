import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'src/app/libraries/ngx-image-cropper/src';
import { NgxPermissionsModule } from 'ngx-permissions';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { LoaderModule } from '../../../loader/loader/loader.module';
import { BaseModalModule } from '../../../modal/base-modal/base-modal.module';

// Components
import { ImageUploadComponent } from './image-upload.component';
import { ImageCroperComponent } from './image-croper/image-croper.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

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
    ImageCropperModule,
    NgxPermissionsModule,
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule,
    LoaderModule,
    BaseModalModule,
    LazyLoadImageModule
  ],
  exports: [ImageUploadComponent, ImageCroperComponent],
  entryComponents: [
    ImageUploadComponent,
    ImageCroperComponent
  ]
})
export class ImageUploadModule { }
