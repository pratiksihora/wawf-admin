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
    this.config = TableApiUtil.lazyTable({ idKey: 'skd_id', module: ApiModule.API, deleteUrl: '/v1/subscription-key/remove-device/{{skd_id}}', paggingUrl: `/v1/reseller/subscription-device/${this.data?.sk_id}`, title: 'Device' });
  }


  tableDeleteApiCall(data = null, action = null) {
    this.loading = true;
    let payload = this.preparePayloadForDelete(data, action);
    this.subscriptions.push(this.tableService.tableCommon(this.tableConfigForDeleteApiCall(), payload).subscribe({
      next: (response: any) => {
        this.tableDeleteCallback(response);
        this.table.table.clear();
      }, error: err => {
        this.tableDeleteCallback(err, true);
      }
    }));
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
