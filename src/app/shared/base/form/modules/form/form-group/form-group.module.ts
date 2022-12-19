import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal Modules
import { ControlSelectorModule } from '../control-selector/control-selector.module';
import { FormControlLayoutModule } from '../../../layouts/form-control-layout/form-control-layout.module';

// Components
import { FormGroupComponent } from './form-group.component';

@NgModule({
  declarations: [FormGroupComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/

    /*** INTERNAL MODULES ***/
    ControlSelectorModule,
    FormControlLayoutModule
  ],
  exports: [FormGroupComponent]
})
export class FormGroupModule { }

