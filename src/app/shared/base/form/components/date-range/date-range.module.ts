import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// External Dependency
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { CustomDateRangeModule } from '../../modules/date/custom-date-range/custom-date-range.module';

// Components
import { DateRangeComponent } from './date-range.component';

@NgModule({
  declarations: [
    DateRangeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule,
    CustomDateRangeModule,
  ],
  exports: [DateRangeComponent],
})
export class DateRangeModule { }
