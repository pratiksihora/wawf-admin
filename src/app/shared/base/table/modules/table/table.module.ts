import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Extrenal Modules
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// Internal Modules
import { TableModule as PrimeTableModule } from 'src/app/libraries/prime/table';
import { ButtonModule } from '../../../button/button/button.module';
import { DrawerModule } from '../../../drawer/drawer/drawer.module';
import { ControlSelectorModule } from '../../../form/modules/form/control-selector/control-selector.module';

// Components
import { TableComponent } from './table.component';
import { TableBodyComponent } from '../../components/table-body/table-body.component';
import { TableHeaderComponent } from '../../components/table-header/table-header.component';
import { TableFilterComponent } from '../../components/table-filter/table-filter.component';
import { TableCaptionComponent } from '../../components/table-caption/table-caption.component';
import { TableToogleComponent } from '../../components/table-toogle/table-toogle.component';
import { TableExportComponent } from '../../components/table-export/table-export.component';
import { TableLayoutOneComponent } from '../../components/table-layout-one/table-layout-one.component';

// Pipes
import { FirstLetterPipeModule } from 'src/app/shared/_core/pipes/first-letter-pipe/first-letter-pipe.module';
import { SafePipeModule } from 'src/app/shared/_core/pipes/safe-pipe/safe-pipe.module';

@NgModule({
  declarations: [
    TableComponent,
    TableBodyComponent,
    TableHeaderComponent,
    TableFilterComponent,
    TableCaptionComponent,
    TableToogleComponent,
    TableExportComponent,
    TableLayoutOneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule,
    PrimeTableModule,
    DragDropModule,
    NgbModalModule,
    InlineSVGModule,
    NgbDropdownModule,
    /*** INTERNAL MODULES ***/
    ControlSelectorModule,
    ButtonModule,
    FirstLetterPipeModule,
    SafePipeModule,
    DrawerModule,
    NgxPermissionsModule.forChild(),
    LazyLoadImageModule
  ],
  exports: [TableComponent]
})
export class TableModule { }
