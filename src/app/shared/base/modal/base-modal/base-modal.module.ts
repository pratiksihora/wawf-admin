import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    BaseModalComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [BaseModalComponent],
})
export class BaseModalModule { }
