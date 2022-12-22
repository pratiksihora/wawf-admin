import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ModalsModule, WidgetsModule } from '../../../_metronic/partials';
import { DashboardComponent } from './dashboard.component';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetsModule,
    ModalsModule,
    LoaderModule,
    NgbAccordionModule
  ],
})
export class DashboardModule { }
