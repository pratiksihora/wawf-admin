import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

// Internal Modules
import { FormControlLayoutModule } from '../../layouts/form-control-layout/form-control-layout.module';

// Components
import { TextEditorComponent } from './text-editor.component';


@NgModule({
  declarations: [TextEditorComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    QuillModule,
    /*** CUSTOM MODULES ***/
    FormControlLayoutModule
  ],
  exports: [TextEditorComponent],
})
export class TextEditorModule { }
