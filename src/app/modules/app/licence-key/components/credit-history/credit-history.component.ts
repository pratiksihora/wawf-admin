import { ChangeDetectorRef, Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

// External Modules
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';

// Services
import { TableService } from 'src/app/api/services/common/table/table.service';
import { TableExportService } from 'src/app/shared/_core/services/table/table-export.service';
import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';

// Components
import { TableApiComponent } from 'src/app/shared/base/table/base-class/table-api/table-api.component';

// Interfaces && Enums
import { TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';
import { TableApiConfig } from 'src/app/shared/constants/models/controls/table/table-api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

// Constants
import { configureTable } from './credit-history.constant';

// Utils
import { TableApiUtil } from 'src/app/shared/_core/utils/api/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-credit-history',
  templateUrl: './credit-history.component.html',
  styleUrls: ['./credit-history.component.scss']
})
export class CreditHistoryComponent extends TableApiComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';
  @Output() closeEvent = new EventEmitter<any>();

  config: TableApiConfig;
  tableConfig: TableConfig;

  constructor(public tableService: TableService,
    public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    public exportService: TableExportService, public permissionService: NgxPermissionsService,
    public translate: TranslateService,
    public clipboard: Clipboard, protected toast: ToastService, public modal: NgbActiveModal) {
    super(tableService, activatedRoute, cdr, exportService)
  }

  ngOnInit(): void {
    this.tableConfig = configureTable(this.translate, this.permissionService, {});
    this.config = TableApiUtil.localTable({ idKey: 'ch_id', module: ApiModule.API, allUrl: `/v1/reseller/credit-history-by-key/${this.data?.sk_id}`, title: 'User' });
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
