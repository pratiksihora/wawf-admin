import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { DroppableFileDirective } from './droppable-file.directive';

@NgModule({
  declarations: [DroppableFileDirective],
  imports: [
    CommonModule
  ], exports: [DroppableFileDirective]
})
export class DroppableFileModule { }
