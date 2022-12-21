import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LicenceKeyComponent } from './licence-key.component';

// Internal Modules
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { ExtendComponent } from './components/extend/extend.component';
import { DeviceHistoryComponent } from './components/device-history/device-history.component';
import { CreditHistoryComponent } from './components/credit-history/credit-history.component';
import { CreateLicenceKeyComponent } from './components/create-licence-key/create-licence-key.component';

const routes: Routes = [
  {
    path: '',
    component: LicenceKeyComponent
  }
];

@NgModule({
  declarations: [
    LicenceKeyComponent,
    ExtendComponent,
    DeviceHistoryComponent,
    CreditHistoryComponent,
    CreateLicenceKeyComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    RouterModule.forChild(routes),
    LoaderModule,
    TableModule
  ]
})
export class LicenceKeyModule { }
