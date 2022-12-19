import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';

// Components
import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    InlineSVGModule,
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule
  ],
  exports: [InputComponent],
})
export class InputModule { }
