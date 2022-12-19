import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoRecordFoundComponent } from './no-record-found.component';

/*** EXTERNAL MODULES ***/
import { InlineSVGModule } from 'ng-inline-svg-2';



@NgModule({
  declarations: [
    NoRecordFoundComponent
  ],
  imports: [
    CommonModule,
    /*** EXTERNAL MODULES ***/
    InlineSVGModule,
  ],
  exports: [NoRecordFoundComponent]
})
export class NoRecordFoundModule { }
