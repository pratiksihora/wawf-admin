// Angular
import { Injectable } from '@angular/core';

// External Modules
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/libraries/prime/api';

// Interfaces
import { ToastrConfig } from 'src/app/constants/models/controls/toastr/toastr-config';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(public message: MessageService, public translate: TranslateService) { }

  show(options: ToastrConfig) {
    this.message.add({ ...options, summary: this.translate.instant(options.summary), detail: this.translate.instant(options.detail) });
  }

  hideAll() {
    this.message.clear();
  }

  hide(key) {
    this.message.clear(key);
  }
}