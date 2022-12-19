import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';

// Components
import { RadioComponent } from './radio.component';

@NgModule({
  declarations: [RadioComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    ColorPickerModule,
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule
  ],
  exports: [RadioComponent],
})
export class RadioModule { }
