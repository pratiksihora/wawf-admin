import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//component
import { LicenceKeyComponent } from './licence-key.component';
import { DeviceHistoryComponent } from './components/device-history/device-history.component';
import { CreditHistoryComponent } from './components/credit-history/credit-history.component';
import { CreateLicenceKeyComponent } from './components/create-licence-key/create-licence-key.component';
import { ExtendComponent } from './components/extend/extend.component';

// external modules
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { DrawerModule } from 'src/app/shared/base/drawer/drawer/drawer.module';
import { InputModule } from 'src/app/shared/base/form/components/input/input.module';
import { SelectModule } from 'src/app/shared/base/form/components/select/select.module';
import { MessageCopyComponent } from './components/message-copy/message-copy.component';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';

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
    CreateLicenceKeyComponent,
    MessageCopyComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    /*** EXTERNAL MODULES ***/
    LoaderModule,
    TableModule,
    DrawerModule,
    InputModule,
    SelectModule,
    NoResultFoundModule
  ]
})
export class LicenceKeyModule { }
