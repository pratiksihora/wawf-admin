import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// External Modules
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { LightRadioGroupComponent } from './light-radio-group.component';

@NgModule({
  declarations: [
    LightRadioGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InlineSVGModule,
    TranslateModule
  ],
  exports: [LightRadioGroupComponent]
})
export class LightRadioGroupModule { }
