import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

// Components
import { LightImageComponent } from './light-image.component';

@NgModule({
  declarations: [
    LightImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*** EXTERNAL MODULES */
    TranslateModule,
    /*** INTERNAL MODULES */
    FormErrorModule,
  ],
  exports: [LightImageComponent]
})
export class LightImageModule { }
