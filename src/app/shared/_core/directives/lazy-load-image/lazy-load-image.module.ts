import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePreloader } from '../img-preloader.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImagePreloader,
  ],
  exports: [ImagePreloader]
})
export class LazyLoadImageModule { }
