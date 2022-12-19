import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { DroppableFileModule } from 'src/app/shared/_core/directives/droppable-file/droppable-file.module';

// Components
import { FileAttachmentComponent } from './file-attachment.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [FileAttachmentComponent],
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
    DroppableFileModule,
    LazyLoadImageModule
  ],
  exports: [FileAttachmentComponent],
})
export class FileAttachmentModule { }
