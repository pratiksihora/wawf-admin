import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { WorkspaceNavigatorComponent } from './workspace-navigator.component';

@NgModule({
  declarations: [
    WorkspaceNavigatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [WorkspaceNavigatorComponent]
})
export class WorkspaceNavigatorModule { }
