// ANGULAR DEPENDENCY
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Metronic Module
import { LayoutModule } from 'src/app/_metronic/layout/layout.module';

// ROUTING MODULES
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    /*** INTERNAL MODULES ***/
    LayoutModule,
    /*** ROUTING MODULE ***/
    AppRoutingModule,
  ],
  exports: [AppRoutingModule],
})
export class AppModule { }
