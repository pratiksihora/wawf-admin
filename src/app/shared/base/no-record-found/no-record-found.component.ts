import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PERMISSION } from '../../../constants/permission/permission.constant';

@Component({
  selector: 'app-no-record-found',
  templateUrl: './no-record-found.component.html',
  styleUrls: ['./no-record-found.component.scss']
})
export class NoRecordFoundComponent implements OnInit {
  @HostBinding('class') class = 'text-center mt-0 d-flex gap-3 flex-column justify-content-center flex-fill';

  @Input() config;
  @Output() callback = new EventEmitter();
  permissionConst = PERMISSION;
  actionAllowed = false;
  

  constructor(
  ) {}

  
  ngOnInit(): void {
    if (this.config?.permissions) {
      if (this.config.permissions.some(this.checkPermission)) {
        this.actionAllowed = true;
      }
    }
  }
  

  callBack() {
    this.callback.emit({ STATUS: 'ADD' });
  }
}
