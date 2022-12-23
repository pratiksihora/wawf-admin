import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactSupportComponent } from './contact-support.component';
import { RouterModule, Routes } from '@angular/router';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';
import { SafePipeModule } from 'src/app/shared/_core/pipes/safe-pipe/safe-pipe.module';

const routes: Routes = [
  {
    path: '',
    component: ContactSupportComponent
  }
];


@NgModule({
  declarations: [
    ContactSupportComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    RouterModule.forChild(routes),
    NoResultFoundModule,
    SafePipeModule
  ]
})
export class ContactSupportModule { }
