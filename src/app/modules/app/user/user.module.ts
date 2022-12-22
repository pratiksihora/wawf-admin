import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//component
import { UserComponent } from './user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

//EXTERNAL MODULES
import { TableModule } from 'src/app/shared/base/table/modules/table/table.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { InputModule } from 'src/app/shared/base/form/components/input/input.module';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    UpdateUserComponent
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
  ]
})
export class UserModule { }
