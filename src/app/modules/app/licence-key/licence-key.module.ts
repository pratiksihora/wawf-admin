import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LicenceKeyComponent } from './licence-key.component';

const routes: Routes = [
  {
      path: '',
      component: LicenceKeyComponent
  }
];

@NgModule({
  declarations: [
    LicenceKeyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LicenceKeyModule { }
