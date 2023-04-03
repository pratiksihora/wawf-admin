import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NoResultFoundModule } from 'src/app/shared/base/no-result-found/no-result-found.module';
import { ApiKeyComponent } from './api-key.component';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';
import { InlineSVGModule } from 'ng-inline-svg-2';

const routes: Routes = [
  {
    path: '',
    component: ApiKeyComponent
  }
];

@NgModule({
  declarations: [
    ApiKeyComponent
  ],
  imports: [
    CommonModule,
    /*** INTERNAL MODULES ***/
    RouterModule.forChild(routes),
    NoResultFoundModule,
    NgbAccordionModule,
    LoaderModule,
    InlineSVGModule
  ]
})
export class ApiKeyModule { }
