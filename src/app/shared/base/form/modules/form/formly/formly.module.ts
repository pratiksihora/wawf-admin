import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { FormArrayModule } from '../form-array/form-array.module';
import { FormGroupModule } from '../form-group/form-group.module';
import { ControlSelectorModule } from '../control-selector/control-selector.module';

// Components
import { FormlyComponent } from './formly.component';

// Pipes
import { SafePipeModule } from 'src/app/shared/_core/pipes/safe-pipe/safe-pipe.module';


@NgModule({
  declarations: [
    FormlyComponent
  ],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*** EXTERNAL MODULES ***/

    /*** CUSTOM MODULES ***/
    FormArrayModule,
    FormGroupModule,
    ControlSelectorModule,
    /*** CUSTOM MODULES ***/
    SafePipeModule,
    TranslateModule.forChild(),
  ],
  exports: [FormlyComponent, ControlSelectorModule],
})
export class FormlyModule { }
