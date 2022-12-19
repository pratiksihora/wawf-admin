import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { LoaderModule } from '../../base/loader/loader/loader.module';
import { NoRecordFoundModule } from '../../base/no-record-found/no-record-found.module';

// Components
import { MultiTypeUploaderComponent } from './multi-type-uploader.component';
import { MultiTypeFileLibraryComponent } from './multi-type-file-library/multi-type-file-library.component';
import { MultiTypeFileUploadComponent } from './multi-type-file-upload/multi-type-file-upload.component';
import { MultiTypeFilePreviewComponent } from './multi-type-file-preview/multi-type-file-preview.component';
import { MultiTypeFileGalleryComponent } from './multi-type-file-gallery/multi-type-file-gallery.component'

@NgModule({
  declarations: [
    MultiTypeUploaderComponent,
    MultiTypeFileLibraryComponent,
    MultiTypeFileUploadComponent,
    MultiTypeFilePreviewComponent,
    MultiTypeFileGalleryComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    LoaderModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    NoRecordFoundModule,
  ],
  exports: [
    MultiTypeUploaderComponent,
    MultiTypeFileLibraryComponent,
    MultiTypeFileUploadComponent,
    MultiTypeFilePreviewComponent
  ],
  providers: [
    NgbActiveModal
  ]
})
export class MultiTypeUploaderModule { }
