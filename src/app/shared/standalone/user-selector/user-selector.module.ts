import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// External Modules
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Internal Modules
import { LoaderModule } from '../../base/loader/loader/loader.module';

// Components
import { UserSelectorComponent } from './user-selector.component';

// Pipes
import { FilterPipeModule } from 'src/app/_core/pipes/filter-pipe/filter-pipe.module';
import { FilterPipe } from 'src/app/_core/pipes/filter-pipe/filter.pipe';

@NgModule({
  declarations: [
    UserSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forChild(),
    InlineSVGModule,
    /*** INTERNAL MODULES ***/
    FilterPipeModule,
    LoaderModule
  ],
  exports: [
    UserSelectorComponent
  ],
  providers: [FilterPipe]
})
export class UserSelectorModule { }
