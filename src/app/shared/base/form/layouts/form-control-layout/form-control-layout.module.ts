import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

// Internal Modules
import { SafePipeModule } from 'src/app/shared/_core/pipes/safe-pipe/safe-pipe.module';
import { FormErrorModule } from '../../components/form-error/form-error.module';

// Components
import { FormControlLayoutComponent } from './form-control-layout.component';

@NgModule({
  declarations: [FormControlLayoutComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    NgbTooltipModule,
    TranslateModule.forChild(),
    /*** CUSTOM MODULES ***/
    FormErrorModule,
    SafePipeModule
  ],
  exports: [FormControlLayoutComponent],
})
export class FormControlLayoutModule { }
