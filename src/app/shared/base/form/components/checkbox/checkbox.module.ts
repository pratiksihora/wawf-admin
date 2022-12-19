import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';

// Components
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  declarations: [CheckboxComponent],
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
  exports: [CheckboxComponent],
})
export class CheckboxModule { }
