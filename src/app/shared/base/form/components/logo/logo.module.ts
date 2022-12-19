import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'src/app/libraries/ngx-image-cropper/src';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { LoaderModule } from '../../../loader/loader/loader.module';
import { DroppableFileModule } from 'src/app/shared/_core/directives/droppable-file/droppable-file.module';

// Components
import { LogoComponent } from './logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    NgbTooltipModule,
    ImageCropperModule,
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule,
    LoaderModule,
    DroppableFileModule,
  ],
  exports: [LogoComponent],
  entryComponents: [
  ]
})
export class LogoModule { }
