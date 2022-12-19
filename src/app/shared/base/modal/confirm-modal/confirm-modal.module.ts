import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// External Modules
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


// 
import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    /*** EXTERNAL MODULES ***/
    NgbModalModule,
  ]
})
export class ConfirmModalModule { }
