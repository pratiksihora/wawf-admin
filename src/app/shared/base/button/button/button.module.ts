import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Components
import { ButtonComponent } from './button.component';

// Pipes
import { SafePipeModule } from 'src/app/shared/_core/pipes/safe-pipe/safe-pipe.module';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    NgxPermissionsModule.forChild(),
    NgbTooltipModule,
    InlineSVGModule,
    /*** Internal MODULES ***/
    SafePipeModule,
  ],
  exports: [ButtonComponent]
})
export class ButtonModule { }
