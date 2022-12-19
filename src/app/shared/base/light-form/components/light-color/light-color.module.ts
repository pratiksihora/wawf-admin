import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';

// Internal Modules
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

// Components
import { LightColorComponent } from './light-color.component';

@NgModule({
  declarations: [
    LightColorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    /*** External Modules ***/
    TranslateModule.forChild(),
    NgbTooltipModule,
    ColorPickerModule,
    /*** CUSTOM MODULES ***/
    FormErrorModule,
  ],
  exports: [LightColorComponent]
})
export class LightColorModule { }
