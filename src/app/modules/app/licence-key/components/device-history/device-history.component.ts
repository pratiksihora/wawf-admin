import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';

// External Modules
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';

// Services
import { TableService } from 'src/app/api/services/common/table/table.service';
import { TableExportService } from 'src/app/shared/_core/services/table/table-export.service';

// Components
import { TableApiComponent } from 'src/app/shared/base/table/base-class/table-api/table-api.component';

// Interfaces && Enums
import { TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';
import { TableApiConfig } from 'src/app/shared/constants/models/controls/table/table-api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

// Constants
import { configureTable } from './device-history.constant';

// Utils
import { TableApiUtil } from 'src/app/shared/_core/utils/api/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent extends TableApiComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<any>();

  config: TableApiConfig;
  tableConfig: TableConfig;

  constructor(public tableService: TableService, public modal: NgbActiveModal,
    public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    public exportService: TableExportService, public permissionService: NgxPermissionsService,
    public translate: TranslateService, private modalService: NgbModal,) {
    super(tableService, activatedRoute, cdr, exportService)
  }

  ngOnInit(): void {
    this.tableConfig = configureTable(this.translate, this.permissionService, {});
    this.config = TableApiUtil.lazyTable({ idKey: 'sk_id', module: ApiModule.API, paggingUrl: `/v1/reseller/subscription-device/${this.data?.sk_id}`, title: 'User' });
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
