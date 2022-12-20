import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreditHistoryComponent } from './credit-history.component';

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
    RouterModule.forChild(routes),
  ]
})
export class CreditHistoryModule { }
