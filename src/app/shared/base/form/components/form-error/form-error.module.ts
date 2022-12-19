import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Translater Dependency
import { TranslateModule } from '@ngx-translate/core';

// Components
import { FormErrorComponent } from './form-error.component';

@NgModule({
  declarations: [
    FormErrorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    FormErrorComponent
  ]
})
export class FormErrorModule { }
