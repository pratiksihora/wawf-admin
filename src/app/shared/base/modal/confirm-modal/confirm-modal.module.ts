import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// External Modules
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule.forChild(),
    /*** CUSTOM MODULES ***/
  ]
})
export class ConfirmModalModule { }
