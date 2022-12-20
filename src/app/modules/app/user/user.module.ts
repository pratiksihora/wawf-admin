import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';

// Internal Modules
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    RouterModule.forChild(routes),
    LoaderModule,
    TableModule
  ]
})
export class UserModule { }
