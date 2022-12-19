import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoRecordFoundComponent } from './no-record-found.component';

/*** EXTERNAL MODULES ***/
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LazyLoadImageModule } from 'ng-lazyload-image';



@NgModule({
  declarations: [
    NoRecordFoundComponent
  ],
  imports: [
    CommonModule,
    /*** EXTERNAL MODULES ***/
    InlineSVGModule,
    NgxPermissionsModule.forChild(),
    LazyLoadImageModule
  ],
  exports: [NoRecordFoundComponent]
})
export class NoRecordFoundModule { }
