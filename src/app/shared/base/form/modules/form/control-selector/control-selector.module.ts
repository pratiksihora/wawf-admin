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
import { ColorInputModule } from '../../../components/color-input/color-input.module';
import { MultiImageUploadModule } from '../../../components/multi-image-upload/multi-image-upload.module';
import { FileAttachmentModule } from '../../../components/file-attachment/file-attachment.module';
import { DatePickerModule } from '../../../components/date-picker/date-picker.module';
import { DateTimePickerModule } from '../../../components/date-time-picker/date-time-picker.module';
import { DateRangeModule } from '../../../components/date-range/date-range.module';
import { SafePipeModule } from 'src/app/shared/_core/pipes/safe-pipe/safe-pipe.module';

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
    ColorInputModule,
    MultiImageUploadModule,
    FileAttachmentModule,
    DatePickerModule,
    DateTimePickerModule,
    DateRangeModule,
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
    ColorInputModule,
    MultiImageUploadModule,
    FileAttachmentModule,
    DatePickerModule,
    DateTimePickerModule,
    DateRangeModule,
  ],
})
export class ControlSelectorModule { }
