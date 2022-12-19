import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';

// Components
import { DatePickerComponent } from './date-picker.component';
import { CustomDateRangeModule } from '../../modules/date/custom-date-range/custom-date-range.module';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule,
    CustomDateRangeModule
  ],
  exports: [DatePickerComponent],
})
export class DatePickerModule { }
