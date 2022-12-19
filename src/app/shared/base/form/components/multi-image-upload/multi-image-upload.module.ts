import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { LoaderModule } from '../../../loader/loader/loader.module';

// Components
import { MultiImageUploadComponent } from './multi-image-upload.component';

@NgModule({
  declarations: [MultiImageUploadComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    NgbTooltipModule,
    /*** CUSTOM MODULES ***/
    LoaderModule,
    FormControlLayoutModule,
  ],
  exports: [MultiImageUploadComponent],
})
export class MultiImageUploadModule { }
