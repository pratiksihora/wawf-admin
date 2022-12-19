import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// External Modules
import { ToastModule as PrimeToastModule } from 'src/app/libraries/prime/toast';

// Components
import { ToastrComponent } from './toastr.component';

@NgModule({
  declarations: [
    ToastrComponent
  ],
  imports: [
    CommonModule,
    // External  Modules
    PrimeToastModule
  ],
  exports: [
    ToastrComponent
  ]
})
export class ToastrModule { }
