import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultFoundComponent } from './no-result-found.component';

/*** EXTERNAL MODULES ***/
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    NoResultFoundComponent
  ],
  imports: [
    CommonModule,
    /*** EXTERNAL MODULES ***/
    InlineSVGModule,
    LazyLoadImageModule
  ],
  exports: [
    NoResultFoundComponent
  ]
})
export class NoResultFoundModule { }
