import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

// Internal Modules
import { FormErrorModule } from '../../../form/components/form-error/form-error.module';

// Components
import { LightTextEditorComponent } from './light-text-editor.component';


@NgModule({
  declarations: [
    LightTextEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    /*** External Modules ***/
    TranslateModule.forChild(),
    NgbTooltipModule,
    QuillModule,
    /*** CUSTOM MODULES ***/
    FormErrorModule,
  ],
  exports: [LightTextEditorComponent]
})
export class LightTextEditorModule { }
