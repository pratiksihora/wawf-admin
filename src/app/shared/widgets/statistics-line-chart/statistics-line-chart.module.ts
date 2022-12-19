import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgApexchartsModule } from 'ng-apexcharts';

import { StatisticsLineChartComponent } from './statistics-line-chart.component';

@NgModule({
  declarations: [
    StatisticsLineChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [StatisticsLineChartComponent]
})
export class StatisticsLineChartModule { }
