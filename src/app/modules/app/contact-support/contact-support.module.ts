import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactSupportComponent } from './contact-support.component';
import { RouterModule, Routes } from '@angular/router';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';

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
    NoResultFoundModule
  ]
})
export class ContactSupportModule { }
