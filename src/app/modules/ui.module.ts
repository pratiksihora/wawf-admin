// ANGULAR DEPENDENCY
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// ROUTING MODULES
import { UiRoutingModule } from './ui-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiRoutingModule,
  ],
  exports: [UiRoutingModule],
})
export class UiModule { }
