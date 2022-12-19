import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { Daterangepicker } from 'ng2-daterangepicker';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { CustomDateRangeComponent } from './custom-date-range.component';

@NgModule({
  declarations: [CustomDateRangeComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    Daterangepicker,
    TranslateModule.forChild(),
  ],
  exports: [CustomDateRangeComponent]
})
export class CustomDateRangeModule { }
