import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BillingComponent } from './billing.component';

// Internal Modules
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent
  }
];

@NgModule({
  declarations: [
    BillingComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    RouterModule.forChild(routes),
    LoaderModule,
    TableModule
  ]
})
export class BillingModule { }
