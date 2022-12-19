import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoModalComponent } from './info-modal.component';

// Pipes
import { SafePipeModule } from 'src/app/_core/pipes/safe-pipe/safe-pipe.module';

@NgModule({
  declarations: [
    InfoModalComponent
  ],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    /*** Internal MODULES ***/
    SafePipeModule
  ]
})
export class InfoModalModule { }
