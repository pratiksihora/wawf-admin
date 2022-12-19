import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { LightSwitchComponent } from './light-switch.component';
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

@NgModule({
  declarations: [
    LightSwitchComponent
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
  exports: [LightSwitchComponent]
})
export class LightSwitchModule { }
