import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';

const routes: Routes = [
  {
    path: '',
    component: FaqComponent
  }
];

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    RouterModule.forChild(routes),
    NoResultFoundModule,
    NgbAccordionModule
  ]
})
export class FaqModule { }
