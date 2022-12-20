import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// External Modules
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';

// Internal Modules
import { UiModule } from 'src/app/modules/ui.module';
import { ConfirmModalModule } from 'src/app/shared/base/modal/confirm-modal/confirm-modal.module';
import { ToastrModule } from 'src/app/shared/base/toastr/toastr.module';

// Components
import { AppComponent } from './app.component';

// Interceptors
import { AuthInterceptor } from 'src/app/shared/_core/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    /*** ANGULAR MODULES ***/
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    TranslateModule.forRoot(),
    InlineSVGModule.forRoot(),
    QuillModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NgbModule,
    NgSelectModule,
    ClipboardModule,
    /*** INTERNAL MODULES ***/
    UiModule,
    ConfirmModalModule,
    ToastrModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
