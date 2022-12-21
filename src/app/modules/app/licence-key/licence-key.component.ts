import { ChangeDetectorRef, Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// External Modules
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';

// Services
import { TableService } from 'src/app/api/services/common/table/table.service';
import { TableExportService } from 'src/app/shared/_core/services/table/table-export.service';

// Components
import { TableApiComponent } from 'src/app/shared/base/table/base-class/table-api/table-api.component';
import { ExtendComponent } from './components/extend/extend.component';
import { DeviceHistoryComponent } from './components/device-history/device-history.component';
import { CreditHistoryComponent } from './components/credit-history/credit-history.component';
import { CreateLicenceKeyComponent } from './components/create-licence-key/create-licence-key.component';

// Interfaces && Enums
import { TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';
import { TableApiConfig } from 'src/app/shared/constants/models/controls/table/table-api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

// Constants
import { configureTable } from './licence-key.constant';

// Utils
import { TableApiUtil } from 'src/app/shared/_core/utils/api/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-licence-key',
  templateUrl: './licence-key.component.html',
  styleUrls: ['./licence-key.component.scss']
})

export class LicenceKeyComponent extends TableApiComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';

  config: TableApiConfig = TableApiUtil.lazyTable({ idKey: 'sk_id', module: ApiModule.API, paggingUrl: '/v1/reseller/subscription/pagging', deleteUrl: '/v1/reseller/delete-key/{{sk_id}}', title: 'User' });
  tableConfig: TableConfig;

  constructor(public tableService: TableService,
    public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    public exportService: TableExportService, public permissionService: NgxPermissionsService,
    public translate: TranslateService, private modalService: NgbModal,) {
    super(tableService, activatedRoute, cdr, exportService)
  }

  ngOnInit(): void {
    this.tableConfig = configureTable(this.translate, this.permissionService, {});
  }

  onAddEdit(value) {
    const modelRef = this.modalService.open(CreateLicenceKeyComponent, { centered: true, size: 'md', backdrop: 'static', scrollable: true });
    modelRef.result.then(res => {
      console.log(res, '===>')
      if (res === 'save') {
        this.table.table.reset();
      }
    })
  }

  tableActionExtend(data) {
    const modelRef = this.modalService.open(ExtendComponent, { centered: true, size: 'md', backdrop: 'static', scrollable: true });
    modelRef.componentInstance.data = data?.rowData;
    modelRef.result.then(res => {
      console.log(res, '===>')
      if (res === 'save') {
        this.table.table.reset();
      }
    })
    return;
  }

  tableActionDevice() {
    this.modalService.open(DeviceHistoryComponent, { centered: true, size: 'sm', backdrop: 'static', scrollable: true });
    return;
  }

  tableActionCredit() {
    this.modalService.open(CreditHistoryComponent, { centered: true, size: 'sm', backdrop: 'static', scrollable: true });
    return;
  }

}
