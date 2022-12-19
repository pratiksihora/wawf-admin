// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './filter.pipe';

// Pipes
@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterPipe],
})
export class FilterPipeModule { }
