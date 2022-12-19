import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Components
import { LightLayoutComponent } from './light-layout.component';
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

@NgModule({
  declarations: [
    LightLayoutComponent
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
  exports: [LightLayoutComponent]
})
export class LightLayoutModule { }
