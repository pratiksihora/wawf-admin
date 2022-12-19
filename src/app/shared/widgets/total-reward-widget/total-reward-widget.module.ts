import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalRewardWidgetComponent } from './total-reward-widget.component';



@NgModule({
  declarations: [
    TotalRewardWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TotalRewardWidgetComponent]
})
export class TotalRewardWidgetModule { }
