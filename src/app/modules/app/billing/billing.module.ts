import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BillingComponent } from './billing.component';

// Internal Modules
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';

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
    TableModule,
    NoResultFoundModule
  ]
})
export class BillingModule { }
