import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//component
import { UserComponent } from './user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ExtendTrialComponent } from './extend-trial/extend-trial.component';

//EXTERNAL MODULES
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { InputModule } from 'src/app/shared/base/form/components/input/input.module';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';
import { SelectModule } from 'src/app/shared/base/form/components/select/select.module';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    UpdateUserComponent,
    ExtendTrialComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    /*** EXTERNAL MODULES ***/
    LoaderModule,
    TableModule,
    InputModule,
    SelectModule,
    NoResultFoundModule
  ]
})
export class UserModule { }
