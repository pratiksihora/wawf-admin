import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Components
import { LightBorderComponent } from './light-border.component';
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

@NgModule({
  declarations: [
    LightBorderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    /*** External Modules ***/
    TranslateModule.forChild(),
    InlineSVGModule,
    NgbTooltipModule,
    /*** CUSTOM MODULES ***/
    FormErrorModule,
  ],
  exports: [LightBorderComponent]
})
export class LightBorderModule { }
