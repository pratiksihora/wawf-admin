import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NouisliderModule } from 'ng2-nouislider';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';

// Components
import { RangeComponent } from './range.component';

@NgModule({
  declarations: [RangeComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    NouisliderModule,
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule
  ],
  exports: [RangeComponent],
})
export class RangeModule { }
