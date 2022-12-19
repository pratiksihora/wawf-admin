import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalCampaignWidgetComponent } from './total-campaign-widget.component';
import { InlineSVGModule } from 'ng-inline-svg-2';



@NgModule({
  declarations: [
    TotalCampaignWidgetComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
  ],
  exports: [TotalCampaignWidgetComponent]
})
export class TotalCampaignWidgetModule { }
