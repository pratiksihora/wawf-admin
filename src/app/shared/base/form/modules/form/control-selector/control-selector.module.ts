import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Internal Modules
import { InputModule } from '../../../components/input/input.module';
import { CheckboxModule } from '../../../components/checkbox/checkbox.module';
import { CheckboxListModule } from '../../../components/checkbox-list/checkbox-list.module';
import { TextAreaModule } from '../../../components/text-area/text-area.module';
import { TextEditorModule } from '../../../components/text-editor/text-editor.module';
import { RadioModule } from '../../../components/radio/radio.module';
import { SwitchModule } from '../../../components/switch/switch.module';
import { SelectModule } from '../../../components/select/select.module';
import { LogoModule } from '../../../components/logo/logo.module';
import { MultiImageUploadModule } from '../../../components/multi-image-upload/multi-image-upload.module';
import { FileAttachmentModule } from '../../../components/file-attachment/file-attachment.module';
import { SafePipeModule } from 'src/app/_core/pipes/safe-pipe/safe-pipe.module';

// Components
import { ControlSelectorComponent } from './control-selector.component';


@NgModule({
  declarations: [
    ControlSelectorComponent
  ],
  imports: [
    /*** ANGULAR MODULES ***/
    CommonModule,
    ReactiveFormsModule,
    /*** EXTERNAL MODULES ***/
    /*** CUSTOM MODULES ***/
    SafePipeModule,
    InputModule,
    TextAreaModule,
    TextEditorModule,
    CheckboxModule,
    CheckboxListModule,
    RadioModule,
    SwitchModule,
    SelectModule,
    LogoModule,
    MultiImageUploadModule,
    FileAttachmentModule,
  ],
  exports: [
    ControlSelectorComponent,
    InputModule,
    TextAreaModule,
    TextEditorModule,
    CheckboxModule,
    CheckboxListModule,
    RadioModule,
    SwitchModule,
    SelectModule,
    MultiImageUploadModule,
    FileAttachmentModule,
  ],
})
export class ControlSelectorModule { }
