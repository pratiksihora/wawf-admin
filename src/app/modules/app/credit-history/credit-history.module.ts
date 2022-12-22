import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreditHistoryComponent } from './credit-history.component';

// Internal Modules
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';

const routes: Routes = [
  {
    path: '',
    component: CreditHistoryComponent
  }
];

@NgModule({
  declarations: [CreditHistoryComponent],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    RouterModule.forChild(routes),
    LoaderModule,
    TableModule,
    NoResultFoundModule
  ]
})
export class CreditHistoryModule { }
