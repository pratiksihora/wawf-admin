import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { ImageUploaderModule } from 'src/app/shared/standalone/image-uploader/image-uploader.module';

// Components
import { ImageComponent } from './image.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LazyLoadImageModule as CustomLazyLoadModule } from '../../../../../_core/directives/lazy-load-image/lazy-load-image.module';
@NgModule({
  declarations: [
    ImageComponent
  ],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    NgbModalModule,
    TranslateModule.forChild(),
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule,
    ImageUploaderModule,
    LazyLoadImageModule,
    CustomLazyLoadModule
  ],
  exports: [
    ImageComponent
  ]
})
export class ImageModule { }
