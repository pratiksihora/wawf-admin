import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from './qr-code.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    QrCodeComponent
  ],
  imports: [
    CommonModule,
    NgxPrintModule
  ]
})
export class QrCodeModule { }
