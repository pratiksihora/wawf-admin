import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';

// Components
import { CheckboxListComponent } from './checkbox-list.component';

@NgModule({
  declarations: [CheckboxListComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule
  ],
  exports: [CheckboxListComponent],
})
export class CheckboxListModule { }
