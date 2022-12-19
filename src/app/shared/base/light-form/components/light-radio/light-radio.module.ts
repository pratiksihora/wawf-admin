import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { LightRadioComponent } from './light-radio.component';
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

@NgModule({
  declarations: [
    LightRadioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    /*** External Modules ***/
    TranslateModule.forChild(),
    NgbTooltipModule,
    /*** CUSTOM MODULES ***/
    FormErrorModule,
  ],
  exports: [LightRadioComponent]
})
export class LightRadioModule { }
