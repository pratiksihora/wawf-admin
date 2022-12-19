import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';
import { CustomDateRangeModule } from '../../modules/date/custom-date-range/custom-date-range.module';

// Components
import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
  declarations: [
    DateTimePickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule,
    CustomDateRangeModule,
  ],
  exports: [DateTimePickerComponent]
})
export class DateTimePickerModule { }

