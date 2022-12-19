import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// External Modules
import { InlineSVGModule } from 'ng-inline-svg-2';

// Components
import { DrawerComponent } from './drawer.component';

// Pipes
import { SafePipeModule } from 'src/app/shared/_core/pipes/safe-pipe/safe-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import {  NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DrawerComponent],
  imports: [
    CommonModule,
    /*** EXTERNAL MODULES ***/
    InlineSVGModule,
    TranslateModule,
    /*** INTERNAL MODULES ***/
    SafePipeModule,
    NgbTooltipModule
  ],
  exports: [DrawerComponent],
})
export class DrawerModule { }
