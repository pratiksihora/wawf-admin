import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalWlWidgetComponent } from './total-wl-widget.component';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    TotalWlWidgetComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
  ],
  exports: [TotalWlWidgetComponent]
})
export class TotalWlWidgetModule { }
