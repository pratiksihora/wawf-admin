import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputModule } from '../../base/form/components/input/input.module';

import { RandomCodeGeneratorComponent } from './random-code-generator.component';

@NgModule({
  declarations: [
    RandomCodeGeneratorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
  ]
})
export class RandomCodeGeneratorModule { }
