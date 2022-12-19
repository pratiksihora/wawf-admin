import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
// import { SortablejsModule } from 'ngx-sortablejs';

// Internal Modules
import { ControlSelectorModule } from '../control-selector/control-selector.module';
import { FormControlLayoutModule } from '../../../layouts/form-control-layout/form-control-layout.module';

// Components
import { FormArrayComponent } from './form-array.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FormArrayComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    // SortablejsModule,
    NgbTooltipModule,
    TranslateModule.forChild(),
    /*** INTERNAL MODULES ***/
    ControlSelectorModule,
    FormControlLayoutModule
  ],
  exports: [FormArrayComponent]
})
export class FormArrayModule { }
