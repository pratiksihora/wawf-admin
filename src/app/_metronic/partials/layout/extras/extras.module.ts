import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Internal Module
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TranslationModule } from 'src/app/i18n';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

//External Module
import { InputModule } from 'src/app/shared/base/form/components/input/input.module';
import { LoaderModule } from 'src/app/shared/base/loader/loader/loader.module';

//component
import { NotificationsInnerComponent } from './dropdown-inner/notifications-inner/notifications-inner.component';
import { QuickLinksInnerComponent } from './dropdown-inner/quick-links-inner/quick-links-inner.component';
import { UserInnerComponent } from './dropdown-inner/user-inner/user-inner.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';
import { SearchResultInnerComponent } from "./dropdown-inner/search-result-inner/search-result-inner.component";
import { ChangePasswordComponent } from './dropdown-inner/user-inner/change-password/change-password.component';

@NgModule({
  declarations: [
    NotificationsInnerComponent,
    QuickLinksInnerComponent,
    SearchResultInnerComponent,
    UserInnerComponent,
    LayoutScrollTopComponent,
    ChangePasswordComponent,
  ],
  imports: [CommonModule, FormsModule, InlineSVGModule, RouterModule, TranslationModule, NgbTooltipModule, InputModule, ReactiveFormsModule, LoaderModule],
  exports: [
    NotificationsInnerComponent,
    QuickLinksInnerComponent,
    SearchResultInnerComponent,
    UserInnerComponent,
    LayoutScrollTopComponent,
    ChangePasswordComponent
  ],
})
export class ExtrasModule {
}
